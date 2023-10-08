FROM python:3.10

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

# Создаем корневой каталог для нашего проекта в контейнере
RUN mkdir /eye_of_chubaka

# Устанавливаем рабочий каталог /eye_of_chubaka
WORKDIR /eye_of_chubaka

# Копируем содержимое текущего каталога в контейнер в /eye_of_chubaka
ADD . /eye_of_chubaka/

# Устанавливаем необходимые пакеты из requirements.txt
RUN pip install -r requirements.txt


COPY ./docker/celery/start-worker /start-worker
RUN sed -i 's/\r$//g' /start-worker
RUN chmod +x /start-worker

COPY ./docker/celery/start-beat /start-beat
RUN sed -i 's/\r$//g' /start-beat
RUN chmod +x /start-beat

COPY ./docker/celery/start-flower /start-flower
RUN sed -i 's/\r$//g' /start-flower
RUN chmod +x /start-flower


COPY ./docker/entrypoint /entrypoint
RUN sed -i 's/\r$//g' /entrypoint
RUN chmod +x /entrypoint

ENTRYPOINT ["/entrypoint"]