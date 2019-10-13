import EBay from '../../src';

const ebay = EBay.fromEnv();
ebay.oAuth2.setCredentials({
    access_token: 'v^1.1#i^1#f^0#I^3#p^3#r^0#t^H4sIAAAAAAAAAOVXa2wUVRTu9iUNFKIiIkFdBomRZnbvndmZ3Z10N2zZhW6hu9tui7ZR6zzutENnZ9aZO20XSWgaXtaihgSjRms1hF+IoqIm8EdDE0hsiCRiMIoYY+QRE+OLICFxZvtgW5UiRdPE/bN7zz333PN957H3gN7yipXba7dfqnTdVjzUC3qLXS44F1SUl1XNLyleUlYEChRcQ70P9Jb2lZyrNvmMmuUakZnVNRO5ezKqZnJ5YYiwDI3TeVMxOY3PIJPDIpeO1K/nKA/gsoaOdVFXCXc8GiJkVmAZWmQYEGAFCjK2VBu32aSHCERRvIwQHRRtHZ4G9r5pWiiumZjXcIigAAySEJAQNkGGo2nO5/cEKKaVcG9Ahqnomq3iAUQ47y6XP2sU+Hp9V3nTRAa2jRDheGRNOhmJR2OJpmpvga3wGA9pzGPLnLxarUvIvYFXLXT9a8y8Npe2RBGZJuENj94w2SgXGXfmJtzPU81LrE2jH9IS6xMpEd0SKtfoRobH1/fDkSgSKedVOaRhBeemY9RmQ9iIRDy2Stgm4lG389Vg8aoiK8gIEbGaSEtzOtZIuNOplKF3KRKSHKTQD/w0Rfl9kAh3IE3CbRIau2PU0BjDUy5ZrWuS4vBluhM6rkG2w2gqLVQBLbZSUksaERk7zhTq+SfoA61OPEcDaOEOzQkpytgcuPPL6ckfz4Zr8b9l+SAHfIhhBMDSsuBjqL/OB6fW/1lOhJ2wRFIpr+MLEvgcmeGNToSzKi8iUrTptTLIUCSOZmSKDsiIlNigTPqCskwKjMSS0C54gJAgiMHA/yQ1MDYUwcJoIj2mbuTx2e3QppNTeJnDeifSmnJZREzVzDecsZzoMUNEB8ZZzuvt7u72dNMe3Wj3UgBA7yP169NiB8rwxISuMr0yqeSzw2ketj6HbQdCRI+dfPblWjsRboytaYyla9uakutiifHEneRZeKr0b5CmkWggPLvQdeegaWbjtYlszZOynpXX17ZYVc0b6im1JVHPtnczTKwhSqtssiESmhl4Uc+ilK4qYu6/ZMCp9elZoA0pxRs4l0aqagtmBNR0gM6uIDvnTdsAn1U8Trl5RD3j1Xm7WzuitrzHXtPG7lG0LrtSdSPnvvEzvCjqlt39b/yEbKmyoqpOU5gR1ZFsNp7JWJgXVBSXZhfndBAAlpoxvFmGqjaWiDbV8SKZ/xGNkanGKAlElhJ4H6RJGQoAiszMYNe3KzeHurSv+MV/DTkM+nwBivX5fHZcZ4QvirpmW1ipABRZSAFSYEWG9AVggAxIIk8GEQoGeFYWaNY3I8yrVcUu9tn3516rmxhJNwptiqDgZfOn96x38iwZLsp/YJ/rEOhzHbTHUeAFK+BysKy8pLm0ZN4SU8HIY7+CPKbSrtkjkoE8nSiX5RWjuNyl7D6547OC6XXoMbB4Yn6tKIFzC4ZZsPTaThlccHclDEIAIWRo2udvBcuv7ZbCRaULf3zFM9BV/tCDLdaBs4dOzFs40DOYAJUTSi5XWVFpn6to0XNJLFzcuqcNW7tDc8wte9/v38RwQjM4H/h1Wc/jh3ed8S440H9MG2kNRh6mRoSKp36TnghWfX78nYEr3auG1bMtx8989ejvu+ZuOS/va3+mc6RD37ezbkCec1flthVLP7xMXB1+d/DIy6eHP6rcWVO87USNv/ri4JVLI+dfPTl4/2vPH92xdmDPpy8VLV7Z/8MXbzXdu3nL8HHtvVXWfRvlXxq/Pzrv6bPPliUP/1x7Cs1Z2GD1hl+v2fgGPNbrJuoO1n09P/bJGemFoqH9wz9dqGprW4BryN0n32zspzZfiHxwYev+029H7+j85tCXt398+NzQd+vuuTy88s72VPXe1Km65m3J7Vc3tRz5djR8fwB6kjteVxAAAA==',
    refresh_token: 'v^1.1#i^1#p^3#f^0#I^3#r^1#t^Ul4xMF80OkQxRTFDNjRCQTEzMzFBNEQxODkwOEQ3MjdCMTM1QjVDXzNfMSNFXjI2MA==',
    refresh_token_expires_in: 0,
    token_type: '',
    expires_in: 0
});

ebay.trading.GetMyMessages({
    MessageIDs: {
        MessageID: [117475106841]
    },
    DetailLevel: 'ReturnMessages'
}).then(message => {
        console.log('message', JSON.stringify(message, null, 2));
}).catch(e => {
    console.log('error', {error: e.message});
});
