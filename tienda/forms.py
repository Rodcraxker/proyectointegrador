# tienda/forms.py
from django import forms
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserChangeForm

User = get_user_model()

class UsuarioChangeForm(UserChangeForm):
    # Campos adicionales del modelo Usuario
    telefono = forms.CharField(max_length=20, required=False)
    ciudad = forms.CharField(max_length=100, required=False)
    email = forms.EmailField() # Asegúrate de que el email no se muestre como ineditable

    class Meta:
        model = User
        # Lista de campos que se pueden editar
        fields = ('first_name', 'last_name', 'email', 'telefono', 'ciudad')
        
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Oculta el campo de contraseña para que no se muestre en el formulario
        if 'password' in self.fields:
            self.fields.pop('password')