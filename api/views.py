from django.shortcuts import render


def message_stream(request):
    return render(request, "api/index.html", {})
