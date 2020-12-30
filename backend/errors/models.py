from django.db import models
from django.db.models.signals import post_save


class Exceptions(models.Model):
    exception_id = models.CharField(max_length=255, blank=True, null=True)
    message = models.TextField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.message


def post_save_exception_id_creater(sender, instance, created, *args, **kwargs):
    if not instance.exception_id:
        instance.exception_id = str(instance.id)
        instance.save()


post_save.connect(post_save_exception_id_creater, sender=Exceptions)
