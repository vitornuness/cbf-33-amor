<script setup lang="ts">
import { ehPalestraAtual, usePalestrasStore } from '@/pinia/palestras';
import { computed, ref } from 'vue';
import { RouterLink } from 'vue-router';

const palestrasStore = usePalestrasStore();

const palestras = computed(() => palestrasStore.organizadasEmDias);
const diaSelecionado = ref<string>((new Date).toLocaleDateString('pt-BR', { dateStyle: 'short' }));

function selecionarDia(dia: string) {
    diaSelecionado.value = dia ?? '';
}
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
                :onclick="() => selecionarDia(dia)" 
            >{{ dia.split('/')[0] }}</button>
        </div>
            <div v-if="palestras[diaSelecionado] === undefined"
                class="text-center mt-5"
            >
                <i class="bi bi-box-arrow-in-up-right text-primary fs-1"></i> <br>
                Selecione um dos dias acima. 
            </div>
            <div v-else 
                class="overflow-x-auto w-100 d-flex flex-nowrap w-100 gap-2" 
                style="scroll-snap-type: x mandatory; scroll-behavior: smooth;"
            >
                <div v-for="palestra in palestras[diaSelecionado]"
                    class="card" 
                    :class="(ehPalestraAtual(palestra) ? 'border-2 border-primary' : '')"
                    style="min-width: 280px; min-height: 420px; scroll-snap-align: start;"
                >
                    <div class="card-header bg-body border-0"> 
                        <div class="w-100 text-end">
                            <span class="px-2 py-1 rounded" 
                                :class="(ehPalestraAtual(palestra) ? 'bg-primary ' : '')"
                                style="font-size: 0.75rem; color: var(--bs-body-bg);"
                            >Agora</span>
                        </div>
                        <h5 class="card-title mt-2"
                            :class="(ehPalestraAtual(palestra) ? 'text-primary' : '')"
                        >{{ palestra.sala }}</h5>
                    </div>
                    <div class="card-body">
                        <h3>{{ palestra.titulo }}</h3>
                    </div>
                    <div class="card-footer bg-body border-0">
                        <p class="text-end">
                            {{ 
                                palestra.inicio.toLocaleDateString('pt-br', { dateStyle: 'short' }) 
                                + ' ' 
                                + palestra.inicio.toLocaleTimeString('pt-br', { timeStyle: 'short' }) 
                                + ' - ' 
                                + palestra.fim.toLocaleTimeString('pt-br', { timeStyle: 'short' })
                            }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="css" scoped></style>