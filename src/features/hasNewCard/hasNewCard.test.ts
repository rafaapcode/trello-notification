import { describe, it, expect } from 'vitest';
import hasNewCard from './hasNewCard';

const prevValue = [
    { name: 'TYest2', desc: '', idShort: 2 },
    { name: 'Vamo que vamo', desc: '', idShort: 3 },
    { name: 'teste om vitest', desc: '', idShort: 5 },
];
describe('Has new Card', () => {
    it('Should return true if exist a new card', () => {
        const currentValue = [
            { name: 'TYest2', desc: '', idShort: 2 },
            { name: 'Vamo que vamo', desc: '', idShort: 3 },
            { name: 'teste om vitest', desc: '', idShort: 5 },
            { name: 'Mais testes', desc: '', idShort: 6 }
        ];
        const result = hasNewCard(prevValue.length, currentValue.length);
        expect(result).toBe(1);
    })
    it('Should return false if not exist a new card', () => {
        const currentValue = [
            { name: 'TYest2', desc: '', idShort: 2 },
            { name: 'Vamo que vamo', desc: '', idShort: 3 },
            { name: 'teste om vitest', desc: '', idShort: 5 },
        ];
        const result = hasNewCard(prevValue.length, currentValue.length);
        expect(result).toBe(0);
    })
});