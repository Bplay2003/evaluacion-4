from django.shortcuts import render
from .serializers import ArtistaSerializer, CategoriaSerializer, ObraSerializer
from .models import Artista, Obra, Categoria
from rest_framework import viewsets
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.serializers import ModelSerializer

# Create your views here.
class ArtistaViewSet(viewsets.ModelViewSet):
    queryset = Artista.objects.select_related('categoria').all()
    serializer_class = ArtistaSerializer
    
class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    
class ObraViewSet(viewsets.ModelViewSet):
    queryset = Obra.objects.select_related('artista').all()
    serializer_class = ObraSerializer

class RegisterSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

# Vista de registro
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Usuario creado exitosamente"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)