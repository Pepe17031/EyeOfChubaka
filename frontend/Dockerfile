FROM node

# Копируем содержимое текущего каталога в контейнер в /eye_of_chubaka
COPY . .
RUN sed -i 's/\r$//g' /start-web-pack
RUN chmod +x /start-web-pack


