<script setup lang="ts">
import { computed } from 'vue';
import { usePalestrasStore } from '@/pinia/palestras';

const palestrasStore = usePalestrasStore();
const palestraAtual = computed(() => palestrasStore.atual);
const proximaPalestra = computed(() => palestrasStore.proxima);
</script>

<template>
    <div class="container-fluid min-vh-100">
        <div v-if="palestrasStore.carregando">
            <p>Carregando...</p>
        </div>
        <div v-else-if="0 === palestrasStore.palestras.length">
            <p>Nenhuma palestra</p>
        </div>
        <div v-else class="row gap-3 pt-4">
            <div class="col-12 gap-1 card">
                <div class="my-1 text-end">
                    <span style="font-size: 0.75rem;" 
                        class="fw-bold bg-primary text-light rounded p-1 px-2 w-auto"
                    >Agora</span>
                </div>
                <div v-if="null === palestraAtual">
                    <p style="font-size: 0.8rem;" class="py-2 text-center">Nenhuma palestra no momento...</p>
                </div>
                <div v-else>
                    <h2 class="p-0 fs-3 text-primary">{{ palestraAtual!.sala }}</h2>
                    <p class="p-0">{{ palestraAtual!.titulo }}</p>
                    <p class="p-0 text-end">
                        {{
                            palestraAtual!.inicio.toLocaleDateString()
                            + ' '
                            + palestraAtual!.inicio.toLocaleTimeString('pt-BR', { timeStyle: 'short' })
                            + ' - '
                            + palestraAtual!.fim.toLocaleTimeString('pt-BR', { timeStyle: 'short' })
                        }}
                    </p>
                </div>
            </div>

            <hr class="border-primary border-2 rounded w-75 mx-auto">

            <div class="col-12 gap-1 card">
                <div class="my-1 text-end">
                    <span style="font-size: 0.75rem;" 
                        class="fw-bold text-primary rounded p-1 px-2 w-auto"
                    >A seguir</span></div>
                <div v-if="null === proximaPalestra">
                    <p style="font-size: 0.8rem;" class="py-2 text-center">Nenhuma palestra a seguir...</p>
                </div>
                <div v-else>
                    <h3 class="p-0 fs-5">{{ proximaPalestra!.sala }}</h3>
                    <p class="p-0">{{ proximaPalestra!.titulo }}</p>
                    <p class="p-0 text-end">
                        {{
                            proximaPalestra!.inicio.toLocaleDateString()
                            + ' '
                            + proximaPalestra!.inicio.toLocaleTimeString('pt-BR', { timeStyle: 'short' })
                            + ' - '
                            + proximaPalestra!.fim.toLocaleTimeString('pt-BR', { timeStyle: 'short' })
                        }}
                    </p>
                </div>
            </div>

            <div class="col-12">
                <RouterLink to="/palestras" 
                    type="button" 
                    class="btn btn-lg btn-primary w-100 rounded-pill" 
                >Programação completa</RouterLink>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped></style>