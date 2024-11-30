package br.com.unifacisa.desafio.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class AccountUserTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static AccountUser getAccountUserSample1() {
        return new AccountUser().id(1L).accountNumber("accountNumber1");
    }

    public static AccountUser getAccountUserSample2() {
        return new AccountUser().id(2L).accountNumber("accountNumber2");
    }

    public static AccountUser getAccountUserRandomSampleGenerator() {
        return new AccountUser().id(longCount.incrementAndGet()).accountNumber(UUID.randomUUID().toString());
    }
}
