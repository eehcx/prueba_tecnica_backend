#!/bin/bash

API_URL="http://localhost:3001/api/expenses"
NUM_RECORDS=${1:-20}

DESCRIPCIONES=(
    "Almuerzo en restaurante"
    "Gasolina para el carro"
    "Boletos de cine"
    "Supermercado"
    "Luz eléctrica"
    "Internet mensual"
    "Café con amigos"
    "Compra de libros"
    "Membresía de gimnasio"
    "Farmacia"
    "Viaje en Uber"
    "Suscripción a Netflix"
    "Cena en restaurante"
    "Compra en el mercado"
    "Agua potable"
    "Gas natural"
    "Renta de departamento"
    "Pago de tarjeta de crédito"
    "Seguro del auto"
    "Colegiatura escolar"
    "Materiales de oficina"
    "Ropa nueva"
    "Reparación del celular"
    "Corte de cabello"
    "Medicamentos"
)

CATEGORIAS=(
    "comida"
    "transporte"
    "entretenimiento"
    "supermercado"
    "servicios"
    "salud"
    "educación"
    "vivienda"
    "ropa"
    "tecnología"
    "otros"
)

random_number() {
    local min=$1
    local max=$2
    echo $(($min + RANDOM % ($max - $min + 1)))
}

random_amount() {
    local min=$1
    local max=$2
    local entero=$(random_number $min $(($max - 1)))
    local decimal=$(random_number 0 99)
    printf "%d.%02d" $entero $decimal
}

echo "Verificando conexión con la API..."
if ! curl -s --head "$API_URL" > /dev/null; then
    echo "Error: La API no está disponible en $API_URL"
    echo "   Asegúrate de que el servidor esté corriendo con: yarn start:dev"
    exit 1
fi
echo "API disponible en $API_URL"

echo "Creando $NUM_RECORDS gastos de ejemplo..."

for ((i=1; i<=NUM_RECORDS; i++)); do
    desc_index=$(random_number 0 $((${#DESCRIPCIONES[@]} - 1)))
    cat_index=$(random_number 0 $((${#CATEGORIAS[@]} - 1)))
    
    DESCRIPCION=${DESCRIPCIONES[$desc_index]}
    CATEGORIA=${CATEGORIAS[$cat_index]}
    MONTO=$(random_amount 50 2000)
    
    # JSON sin indentación para evitar problemas
    JSON_DATA="{\"description\":\"$DESCRIPCION\",\"amount\":$MONTO,\"category\":\"$CATEGORIA\"}"
    
    RESPONSE=$(curl -s -X POST "$API_URL" \
        -H "Content-Type: application/json" \
        -d "$JSON_DATA")
    
    if echo "$RESPONSE" | grep -q "id"; then
        echo "[$i/$NUM_RECORDS] Creado: $DESCRIPCION - \$$MONTO MXN ($CATEGORIA)"
    else
        echo "[$i/$NUM_RECORDS] Error: $RESPONSE"
    fi
    
    sleep 0.1
done

echo "¡Datos poblados exitosamente!"
echo "Puedes ver los gastos con: curl \"$API_URL?page=1&limit=10\""
