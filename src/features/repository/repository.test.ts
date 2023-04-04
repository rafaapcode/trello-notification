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
        const mock: IChacheData = { id: 0, idBoard: '123', key: '12391341074101h190h19', token: 'obasibfipabf912gh9bc9gr01vb3' };
        sut.create(mock);
        expect(DbInMemory.lenthDb()).toBe(1);
    })

    it('Should return a item', () => {
        const sut = makeSut();
        const mock: IChacheData = { id: 0, idBoard: '123', key: '12391341074101h190h19', token: 'obasibfipabf912gh9bc9gr01vb3' };
        const result = sut.getValue(mock.id);
        expect(result).toEqual(mock);
    })

    it('Should return a null', () => {
        const sut = makeSut();
        const mock: IChacheData = { id: 1, idBoard: '123', key: '12391341074101h190h19', token: 'obasibfipabf912gh9bc9gr01vb3' };
        const result = sut.getValue(mock.id);
        expect(result).toBeNull();
    })

    it('Should return a item', () => {
        const sut = makeSut();
        const mock: IChacheData = { id: 0, idBoard: '123', key: '12391341074101h190h19', token: 'obasibfipabf912gh9bc9gr01vb3' };
        sut.delete(mock.id);
        expect(DbInMemory.lenthDb()).toBe(0);
    })
})