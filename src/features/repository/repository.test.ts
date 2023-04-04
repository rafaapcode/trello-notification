import { describe, it, expect, beforeAll } from 'vitest';
import DbInMemory from '../db/dbInMemory';
import RepositoryDb from './repository';
import { IChacheData } from '../../dtos/db.dto';

const makeSut = () => {
    const sut = new RepositoryDb(DbInMemory);

    return sut;
}

describe('Repository', () => {
    beforeAll(() => {
        DbInMemory.clear();
    })

    it('Should storage a new item', () => {
        const sut = makeSut();
        const mock: IChacheData = { idBoard: '123', key: '12391341074101h190h19', token: 'obasibfipabf912gh9bc9gr01vb3' };
        sut.create(mock);
        expect(DbInMemory.lengthDatabase).toBe(1);
    })

    it('Should return a item', () => {
        const sut = makeSut();
        const mock: IChacheData = { idBoard: '123', key: '12391341074101h190h19', token: 'obasibfipabf912gh9bc9gr01vb3' };
        const result = sut.getValue(mock.idBoard);
        expect(result).toEqual(mock);
    })

    it('Should return a null', () => {
        const sut = makeSut();
        const mock: IChacheData = { idBoard: '1234', key: '12391341074101h190h19', token: 'obasibfipabf912gh9bc9gr01vb3' };
        const result = sut.getValue(mock.idBoard);
        expect(result).toBeNull();
    })

    it('Should return a item', () => {
        const sut = makeSut();
        const mock: IChacheData = { idBoard: '123', key: '12391341074101h190h19', token: 'obasibfipabf912gh9bc9gr01vb3' };
        sut.delete(mock.idBoard);
        expect(DbInMemory.lengthDatabase).toBe(0);
    })
})