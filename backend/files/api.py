import os

from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from errors.models import Exceptions
from files.models import FileUpload
from files.serializer import FileSerializer


class FileUploadApi(APIView):
    def post(self, request, *args, **kwargs):
        if request.data is not None:
            title = request.data.get('title')
            file = request.data.get('file')
            image = FileUpload.objects.create(title=title, path=file)
            file_serializer = FileSerializer(instance=image)
            return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        return Response('Data should not be null', status=status.HTTP_400_BAD_REQUEST)


class ImageList(APIView):
    def get(self, request, *args, **kwargs):
        try:
            files = FileUpload.objects.all()
            file_serializer = FileSerializer(files, many=True)
            return Response(file_serializer.data)
        except Exception as e:
            Exceptions.objects.create(message=e.__doc__)
            return Response(e.__doc__, status=status.HTTP_204_NO_CONTENT)


class ImageDetail(APIView):
    def get(self, request, id):
        try:
            image = FileUpload.objects.get(id=id)
            file_serializer = FileSerializer(image)
            return Response(file_serializer.data)
        except ObjectDoesNotExist as noObject:
            Exceptions.objects.create(message=noObject.__doc__)
            return Response(f"Image with {id} is not found", status=status.HTTP_404_NOT_FOUND)


def delete_current_image(path):
    full_path = os.path.join(settings.MEDIA_ROOT, str(path))
    os.remove(full_path)


def is_empty(path):
    print(os.path.dirname(path))
    if len(os.listdir(os.path.dirname(path))) == 0:
        return True


def delete_empty_dir(path):
    if is_empty(path):
        empty_directory = os.path.dirname(path)
        print(empty_directory)
        try:
            os.rmdir(empty_directory)
        except OSError:
            print(OSError.__doc__)


class ImageEditAPI(APIView):
    def put(self, request, id):
        try:
            print(request.data)
            image = FileUpload.objects.get(id=id)
            title = request.data.get('title')
            file = request.data.get('file')
            current_path = image.path
            if title is not None:
                image.title = title
            if file != '':
                delete_current_image(current_path)
                image.path = file
            image.save()
            file_serializer = FileSerializer(instance=image)
            return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(e.__doc__)


class ImageDelete(APIView):
    def delete(self, request, id):
        try:
            image = FileUpload.objects.get(id=id)
            if image is None:
                return Response(f"Image with {id} is not found", status=status.HTTP_404_NOT_FOUND)
            full_path = image.path
            delete_current_image(full_path)
            image.delete()
            return Response(f"Image with {id} is deleted")
        except Exception as e:
            Exceptions.objects.create(message=e.__doc__)
            return Response(status=status.HTTP_204_NO_CONTENT)
