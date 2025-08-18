# tienda/models.py
from django.db import models
from django.contrib.auth.models import AbstractUser

class Usuario(AbstractUser):
    email = models.EmailField(unique=True)
    telefono = models.CharField(max_length=20, blank=True)
    ciudad = models.CharField(max_length=100, blank=True)

    REQUIRED_FIELDS = ['email', 'first_name', 'last_name', 'telefono', 'ciudad']
    USERNAME_FIELD = 'username'

    def __str__(self):
        return self.username


from django.conf import settings

class Compra(models.Model):
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='compras')
    fecha_compra = models.DateTimeField(auto_now_add=True)
    total = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Compra #{self.id} de {self.usuario.username} - Total: ${self.total}"

    class Meta:
        verbose_name_plural = "Compras"


class DetalleCompra(models.Model):
    compra = models.ForeignKey(Compra, on_delete=models.CASCADE, related_name='detalles')
    producto_id = models.CharField(max_length=50)
    nombre_producto = models.CharField(max_length=255)
    cantidad = models.PositiveIntegerField(default=1)
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    imagen_producto = models.URLField(max_length=500, blank=True, null=True)  # ← nuevo campo

    def __str__(self):
        return f"{self.cantidad}x {self.nombre_producto} en Compra #{self.compra.id}"


    class Meta:
        verbose_name_plural = "Detalles de Compra"



# En tu archivo tienda/models.py

from django.db import models
from django.conf import settings # Paso 1: Importa la configuración

class Orden(models.Model):
    # Paso 2: Usa settings.AUTH_USER_MODEL
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    total_orden = models.DecimalField(max_digits=10, decimal_places=2)

class ItemOrden(models.Model):
    orden = models.ForeignKey(Orden, on_delete=models.CASCADE)
    nombre_producto = models.CharField(max_length=200)
    precio_producto = models.DecimalField(max_digits=10, decimal_places=2)