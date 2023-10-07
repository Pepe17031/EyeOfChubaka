# Указываем образ, на основе которого будет создан наш контейнер
# Используем официальный образ Python как родительский
FROM python:3.10

# Переменная окружения гарантирует вывод Python напрямую в терминал без буферизации
ENV PYTHONUNBUFFERED 1

# Создаем корневой каталог для нашего проекта в контейнере
RUN mkdir /eye_of_chubaka

# Устанавливаем рабочий каталог /eye_of_chubaka
WORKDIR /eye_of_chubaka

# Копируем содержимое текущего каталога в контейнер в /eye_of_chubaka
ADD . /eye_of_chubaka/

COPY ./flower /start-flower
RUN sed -i 's/\r$//g' /start-flower
RUN chmod +x /start-flower

# Устанавливаем необходимые пакеты из requirements.txt
RUN pip install -r requirements.txt

COPY ./entrypoint /entrypoint
RUN sed -i 's/\r$//g' /entrypoint
RUN chmod +x /entrypoint

ENTRYPOINT ["/entrypoint"]