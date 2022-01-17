module.exports = {
  pwa: {
    name: 'Goodies',
    themeColor: '#222428',
    msTileColor: '#222428',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    manifestOptions: {
      // eslint-disable-next-line @typescript-eslint/camelcase
      background_color: '#f0f0f0',
      icons: [
        {
          src: './img/icons/icon-256.png',
          sizes: '256x256',
        },
      ],
    },
  },
};
