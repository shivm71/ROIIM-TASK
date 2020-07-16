from django.db import models

# Create your models here.
class Paysafe_user(models.Model):
    paysafe_id = models.CharField(max_length=50)
    cog_id = models.CharField(max_length= 20)



    def __str__(self):
        return self.cog_id