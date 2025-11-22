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
        }, 
        organizadasEmDias(): Record<string, Palestra[]> {
            const grupos: Record<string, Palestra[]> = {};

            this.palestras.forEach(palestra => {
                const dia = palestra.inicio.toLocaleDateString('pt-br', { dateStyle: 'short' });

                if (!grupos[dia]) {
                    grupos[dia] = [];
                }

                grupos[dia].push(palestra);
            });

            return grupos;
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

export function ehPalestraAtual(palestra: Palestra): boolean 
{
    const dataHoraAtual = new Date();
    // const dataHoraAtual = new Date('2025-11-29 09:10:00');

    return dataHoraAtual >= palestra.inicio 
        && dataHoraAtual <= palestra.fim;
}

export function ehProximaPalestra(palestra: Palestra): boolean 
{
    const dataHoraAtual = new Date();
    // const dataHoraAtual = new Date('2025-11-29 09:10:00');

    return dataHoraAtual < palestra.inicio 
        && dataHoraAtual < palestra.fim;
}