export class Flag {
    constructor(countryName, shortName) {
    this.countryName = countryName;
    this.shortName = shortName;
    this.dir = `public/flags/${shortName}.png`;
  }
}
