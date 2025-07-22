# D:\catalogo_back\catalogo\catalogo_back\api\models.py

from django.db import models

# Modelo para Categoria (¡Ahora es una clase independiente!)
class Categoria(models.Model):
    nombre = models.CharField(max_length=100, unique=True) # Generalmente una categoría tiene un nombre único
    descripcion = models.TextField(blank=True, null=True) # Opcional: una descripción para la categoría

    def __str__(self):
        return self.nombre

    class Meta:
        verbose_name_plural = "Categorias" # Buena práctica para plurales en el admin


class Artista(models.Model):
    nombre = models.CharField(max_length=200)

    def __str__(self):
        return self.nombre


class Obra(models.Model):
    titulo = models.CharField(max_length=200)
    precio = models.FloatField()
    fecha = models.DateField()
    artista = models.ForeignKey(Artista, on_delete=models.CASCADE, related_name='obras')
    # Ahora 'categoria' es una Foreign Key al modelo Categoria
    categoria = models.ForeignKey(Categoria, on_delete=models.SET_NULL, null=True, blank=True, related_name='obras') # Usar SET_NULL si quieres mantener la Obra si se borra la Categoría

    def __str__(self):
        return self.titulo
    