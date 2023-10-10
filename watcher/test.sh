#!/bin/bash

readarray -t json_coin_list < "coin-list.txt"
formatted_pairs=("${json_coin_list[@]//[[:punct:]]}")
read -r -a pair_array <<< "${formatted_pairs[@]}"

# Создайте временный файл docker-compose.yml
compose_file=$(mktemp)
trap 'rm -f "$compose_file"' EXIT

# Запишите конфигурацию в файл
echo "version: '3'" > "$compose_file"
echo "services:" >> "$compose_file"

for pair in "${pair_array[@]}"; do
  container_name="coin_watcher_${pair}"
  echo "  $container_name:" >> "$compose_file"
  echo "    image: coin_watcher" >> "$compose_file"
  echo "    command: \"$pair\"" >> "$compose_file"
  echo "    networks:" >> "$compose_file"
  echo "    - eye_of_chubaka_default" >> "$compose_file"

done

  echo "networks:" >> "$compose_file"
  echo "  eye_of_chubaka_default:" >> "$compose_file"
  echo "    external: true" >> "$compose_file"
# Запустите контейнеры с помощью docker-compose
docker-compose -f "$compose_file" up  -d  # Запустить в фоновом режиме

# Опционально: Добавьте команду для остановки и удаления контейнеров
read -p "Press enter to stop and remove containers, or Ctrl+C to exit without stopping."

docker-compose -f "$compose_file" down

# Опционально: Добавьте команду для удаления временного файла
rm -f "$compose_file"
