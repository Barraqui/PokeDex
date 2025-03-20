<script setup lang="ts">
import type { TiposDados } from '@/services/types'

type Props = {
  data: TiposDados
}
</script>

<template>
  <div class="poke-info">
    <h1>{{ data.name }}</h1>
  </div>
</template>

<style scoped></style>
