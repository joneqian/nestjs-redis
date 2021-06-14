import { Test } from '@nestjs/testing';
import IORedis from 'ioredis';
import { RedisHealthIndicator } from './redis.health';
import { REDIS_CLIENTS } from './redis.constants';
import { RedisService } from './redis.service';
import { RedisClients } from './interfaces';
import { testConfig } from '../utils';

describe(`${RedisHealthIndicator.name}`, () => {
    const clients: RedisClients = new Map();

    let redisHealth: RedisHealthIndicator;

    afterAll(() => {
        [...clients.values()].forEach(client => client.disconnect());
    });

    beforeAll(async () => {
        clients.set(
            'client0',
            new IORedis({
                ...testConfig
            })
        );

        const moduleRef = await Test.createTestingModule({
            providers: [
                {
                    provide: REDIS_CLIENTS,
                    useValue: clients
                },
                RedisService,
                RedisHealthIndicator
            ]
        }).compile();

        redisHealth = moduleRef.get<RedisHealthIndicator>(RedisHealthIndicator);
    });

    test('should state up', () => {
        return expect(redisHealth.pingCheck('redis', { namespace: 'client0' })).resolves.toEqual({
            redis: { status: 'up' }
        });
    });
});