from rest_framework import serializers

from files.models import FileUpload


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileUpload
        fields = ['id', 'title', 'path']
