# tienda/urls.py
from django.urls import path
from . import views # Asegúrate de que todas las vistas necesarias estén definidas en views.py

urlpatterns = [
    # Páginas principales de la tienda
    path('', views.index, name='index'),
    path('componentes/', views.componentes, name='componentes'),
    path('laptops/', views.laptops, name='laptops'),
    path('grafos/', views.grafos, name='grafos'),
    path('carrito/', views.carrito, name='carrito'),
    path('perfil/', views.perfil, name='perfil'),
    path('logout/', views.logout_usuario, name='logout_usuario'),
    path('login/', views.login_view, name='login'),
    path('form-registro/', views.form_registro, name='form'),

    #Almacenar detalles de compra
    path('procesar-compra/', views.procesar_compra, name='procesar_compra'),

    #Editar informacion
    path('perfil/', views.perfil, name='perfil'),
    path('perfil/editar/', views.editar_perfil, name='editar_perfil'),
                                                              

    # Esta URL procesa los datos POST del formulario de registro
    path('registrar-usuario/', views.registrar_usuario, name='registrar_usuario'),

    # URLs para el inicio de sesión de usuarios
    path('login/', views.login_usuario, name='login'),
    # (Si tienes una vista de logout, también la añadirías aquí)
    # path('logout/', views.logout_usuario, name='logout'),
]