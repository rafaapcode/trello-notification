import { describe, it, expect, vi } from 'vitest';
import RequestBoard from './request';

const requestBoard = new RequestBoard('m7sqPiYX');

describe('Request', async () => {
    
    it('Should return the board with 4 fields and sorted', async () => {
        const spy = vi.spyOn(requestBoard, 'getBoard');
        const expected = [
            { name: 'TYest2', desc: '', idShort: 2 },
            { name: 'Vamo que vamo', desc: '', idShort: 3 },
            { name: 'teste om vitest', desc: '', idShort: 5 }
        ];
        spy.mockImplementationOnce(() => Promise.resolve(expected))
        const req = await requestBoard.getBoard();
        expect(req).toEqual(expected);
    })
});