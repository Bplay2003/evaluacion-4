from .models import Artista, Categoria, Obra
from rest_framework import serializers

class ArtistaSerializer(serializers.ModelSerializer):
    categoria_id = serializers.PrimaryKeyRelatedField(queryset=Categoria.objects.all(), source='categoria', write_only=True)
    
    class Meta:
        model = Artista
        fields = ['id', 'nombre', 'categoria', 'categoria_id']
        
class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'
        
class ObraSerializer(serializers.ModelSerializer):
    artista_id = serializers.PrimaryKeyRelatedField(queryset=Artista.objects.all(), source='artista', write_only=True)
    
    class Meta:
        model = Obra
        fields = '__all__'