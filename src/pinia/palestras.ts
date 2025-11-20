import data from '../../data/data.json';
import { defineStore } from "pinia";
import type { Palestra } from "@/types/Palestra";

export const usePalestrasStore = defineStore('palestras', {
    state: () => ({
        palestras: [] as Palestra[], 
        carregando: false
    }),
    getters: {
        atual(): Palestra | null {
            return this.palestras.find((palestra) => ehPalestraAtual(palestra)) ?? null;
        }, 
        proxima(): Palestra | null {
            return this.palestras.find((palestra) => ehProximaPalestra(palestra)) ?? null;
        }
    }, 
    actions: {
        carregarPalestras() {
            this.carregando = true;
            
            this.palestras = data.map((palestra: any) => ({
                ...palestra, 
                inicio: new Date(palestra.inicio), 
                fim: new Date(palestra.fim)
            })) as Palestra[];

            this.carregando = false;

            return this.palestras;
        }
    }
});

function ehPalestraAtual(palestra: Palestra): boolean 
{
    const dataHoraAtual = new Date();
    // const dataHoraAtual = new Date('2025-11-29 09:10:00');

    return dataHoraAtual >= palestra.inicio 
        && dataHoraAtual <= palestra.fim;
}

function ehProximaPalestra(palestra: Palestra): boolean 
{
    const dataHoraAtual = new Date();
    // const dataHoraAtual = new Date('2025-11-29 09:10:00');

    return dataHoraAtual < palestra.inicio 
        && dataHoraAtual < palestra.fim;
}