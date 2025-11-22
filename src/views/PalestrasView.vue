<script setup lang="ts">
import { ehPalestraAtual, usePalestrasStore } from '@/pinia/palestras';
import { computed, ref } from 'vue';
import { RouterLink } from 'vue-router';

const palestrasStore = usePalestrasStore();

const palestras = computed(() => palestrasStore.organizadasEmDias);
const diaSelecionado = ref<string>((new Date).toLocaleTimeString('pt-BR', { timeStyle: 'short' }));
</script>

<template>
    <nav>
        <RouterLink to="/" 
            style="font-size: 0.75rem;" 
            class="btn btn-link text-decoration-none py-3"
        >
            <i class="bi bi-chevron-left"></i>
            Voltar para o Início
        </RouterLink>
    </nav>
    <section class="container" style="max-width: 600px;">
        <h1>Palestras</h1>
        
        <div v-if="palestrasStore.carregando">
            <p>Carregando...</p>
        </div>
        <div v-else-if="palestrasStore.palestras.length === 0">
            <p>Nenhuma palestra encontrada.</p>
        </div>
        <div v-else>
        <div class="row justify-content-end w-100 mx-auto mb-3 gap-2">
            <button v-for="(palestrasDia, dia) in palestras"
                type="button"
                class="btn btn-lg btn-outline-primary col-auto p-2" 
                :onclick="() => diaSelecionado = dia ?? ''" 
            >{{ dia.split('/')[0] }}</button>
        </div>
            <div v-if="palestras[diaSelecionado] === undefined"
                class="text-center mt-5"
            >
                <i class="bi bi-box-arrow-in-up-right text-primary fs-1"></i> <br>
                Selecione um dos dias acima. 
            </div>
            <div v-else 
                id="carouselPalestras" 
                class="carousel slide"
            >
                <div class="carousel-indicators">
                    <button v-for="(palestra, index) in palestras[diaSelecionado] ?? []" 
                        type="button" 
                        data-bs-target="#carouselPalestras" 
                        :data-bs-slide-to="index" 
                        :class="(index === 0 ? 'active' : '')" 
                        class="bg-primary" 
                        :aria-current="index === 0" 
                        :aria-label="palestra.titulo" 
                        :key="index"
                    ></button>
                </div>
                <div class="carousel-inner border rounded-4">
                    <div v-for="(palestra, index) in palestras[diaSelecionado]" 
                        class="carousel-item" 
                        :class="(index === 0 ? 'active' : '')" 
                        :key="index"
                    >
                        <div class="card border-0" style="height: 60vh;">
                            <div class="card-header border-0 bg-body">
                                <div class="d-flex flex-column">
                                    <div
                                        class="w-100 text-end"
                                    >
                                        <span class="text-white p-1 rounded" 
                                            :class="(ehPalestraAtual(palestra)) ? 'bg-primary ' : 'bg-body'"
                                            style="font-size: 0.75rem;"
                                        >Agora</span>
                                    </div>
                                    <h5 :class="(ehPalestraAtual(palestra) ? 'text-primary' : '')">
                                        {{ palestra.sala }}
                                    </h5>
                                </div>
                            </div>
                            <div class="card-body">
                                <h2>{{ palestra.titulo }}</h2>
                            </div>
                            <div class="card-footer border-0 pb-5 bg-body">
                                <p class="w-100 text-end">
                                    {{
                                        palestra!.inicio.toLocaleDateString()
                                        + ' '
                                        + palestra!.inicio.toLocaleTimeString('pt-BR', { timeStyle: 'short' })
                                        + ' - '
                                        + palestra!.fim.toLocaleTimeString('pt-BR', { timeStyle: 'short' })
                                    }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselPalestras" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselPalestras" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    </section>
</template>

<style lang="css" scoped></style>