# tienda/views.py
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout # Added logout for completeness
from django.contrib.auth import get_user_model
from django.contrib import messages
from django.contrib.auth.forms import AuthenticationForm 
from django.contrib.auth.decorators import login_required
from .models import Compra 
User = get_user_model()


def index(request):
    return render(request, 'tienda/index.html')

def form_registro(request):
    return render(request, 'tienda/form.html')

def registrar_usuario(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        telefono = request.POST.get('telefono')
        ciudad = request.POST.get('ciudad')
        email = request.POST.get('email')
        password = request.POST.get('password1')
        password_confirm = request.POST.get('password2')

        if not all([username, first_name, last_name, email, password, password_confirm]):
            messages.error(request, 'Todos los campos obligatorios deben ser llenados.')
            return redirect('form')

        if password != password_confirm:
            messages.error(request, 'Las contraseñas no coinciden.')
            return redirect('form')

        if User.objects.filter(username=username).exists():
            messages.error(request, 'Ese nombre de usuario ya está en uso.')
            return redirect('form')

        if User.objects.filter(email=email).exists():
            messages.error(request, 'Ese correo electrónico ya está registrado.')
            return redirect('form')

        try:
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password,
                first_name=first_name,
                last_name=last_name,
            )
            # Asignar los campos personalizados adicionales
            user.telefono = telefono
            user.ciudad = ciudad
            user.save()

            login(request, user)
            messages.success(request, '¡Cuenta creada con éxito! Bienvenido a RDTWARE.')
            return redirect('index')

        except Exception as e:
            messages.error(request, f'Ocurrió un error al registrar: {e}')
            return redirect('form')

    return redirect('form')


# --- ADD THIS 'login_usuario' VIEW ---
def login_usuario(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        if not username or not password:
            messages.error(request, 'Ambos campos son obligatorios.')
            return render(request, 'tienda/login.html', {'error_message': 'Ambos campos son obligatorios.'})

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            messages.success(request, f'¡Bienvenido de nuevo, {username}!')
            return redirect('index')
        else:
            messages.error(request, 'Nombre de usuario o contraseña incorrectos.')
            return render(request, 'tienda/login.html', {'error_message': 'Credenciales inválidas.'})

    return render(request, 'tienda/login.html')

# --- Optional: Add a logout view for completeness ---
def logout_usuario(request):
    logout(request)
    messages.info(request, 'Has cerrado sesión correctamente.')
    return redirect('index') # Redirect to homepage after logout


# Placeholder views for other navigation links
def componentes(request):
    return render(request, 'tienda/componentes.html')

def laptops(request):
    return render(request, 'tienda/laptops.html')

def grafos(request):
    return render(request, 'tienda/grafos.html')

def carrito(request):
    return render(request, 'tienda/carrito.html')


@login_required
def perfil(request):
    compras = Compra.objects.filter(usuario=request.user).prefetch_related('detalles')
    return render(request, 'tienda/perfil.html', {'compras': compras})




@login_required
def perfil_usuario(request):
    user = request.user
    compras = user.compras.all().order_by('-fecha_compra')  # gracias a related_name='compras' en Compra

    context = {
        'user': user,
        'compras': compras,
    }
    return render(request, 'tienda/perfil.html', context)


def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('perfil')  # Redirige al perfil o a donde desees
        else:
            messages.error(request, 'Usuario o contraseña incorrectos')
    return render(request, 'tienda/login.html', {})

