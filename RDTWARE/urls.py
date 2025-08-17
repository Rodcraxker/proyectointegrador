# RDTWARE/urls.py
from django.contrib import admin
from django.urls import path, include # Asegúrate de importar 'include'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('tienda/', include('tienda.urls')),
    path('', include('tienda.urls')), # Para la URL raíz
]
