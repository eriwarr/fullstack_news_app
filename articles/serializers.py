from rest_framework import serializers
from .models import Article

class ArticleSerializer(serializers.ModelSerializer):
    has_owner_permissions = serializers.SerializerMethodField('get_owner_status')
    owner = serializers.ReadOnlyField(source='author.username')

    def get_owner_status(self, obj):
        return obj.author == self.context['request'].user

    class Meta:
        model = Article
        fields = "__all__"
