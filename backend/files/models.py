from django.db import models


def upload_path(instance, filename):
    return '/'.join(['file', str(instance.id), filename])


class FileUpload(models.Model):
    title = models.CharField(max_length=255, blank=True, null=True)
    path = models.ImageField(blank=True, null=True, upload_to=upload_path)

    def __str__(self):
        return self.title
