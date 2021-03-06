'use strict';

[{
  zoneRegex: /^The Second Coil Of Bahamut - Turn \(1\)$/,
  timelineFile: 't6.txt',
  triggers: [
    {
      id: 'T6 Thorn Whip',
      regex: Regexes.tether({ id: '0012' }),
      regexDe: Regexes.tether({ id: '0012' }),
      regexFr: Regexes.tether({ id: '0012' }),
      regexJa: Regexes.tether({ id: '0012' }),
      regexCn: Regexes.tether({ id: '0012' }),
      regexKo: Regexes.tether({ id: '0012' }),
      run: function(data, matches) {
        data.thornMap = data.thornMap || {};
        data.thornMap[matches.source] = data.thornMap[matches.source] || [];
        data.thornMap[matches.source].push(matches.target);
        data.thornMap[matches.target] = data.thornMap[matches.target] || [];
        data.thornMap[matches.target].push(matches.source);
      },
    },
    {
      id: 'T6 Thorn Whip',
      regex: Regexes.ability({ id: '879', source: 'Rafflesia' }),
      regexDe: Regexes.ability({ id: '879', source: 'Rafflesia' }),
      regexFr: Regexes.ability({ id: '879', source: 'Rafflesia' }),
      regexJa: Regexes.ability({ id: '879', source: 'ラフレシア' }),
      regexCn: Regexes.ability({ id: '879', source: '大王花' }),
      regexKo: Regexes.ability({ id: '879', source: '라플레시아' }),
      condition: function(data, matches) {
        return data.me == matches.target;
      },
      infoText: function(data) {
        let partners = data.thornMap[data.me];
        if (!partners) {
          return {
            en: 'Thorns on YOU',
          };
        }
        if (partners.length == 1) {
          return {
            en: 'Thorns w/ (' + data.ShortName(partners[0]) + ')',
          };
        }
        if (partners.length == 2) {
          return {
            en: 'Thorns w/ (' + data.ShortName(partners[0]) + ', ' + data.ShortName(partners[1]) + ')',
          };
        }
        return {
          en: 'Thorns (' + partners.length + ' people)',
        };
      },
      run: function(data) {
        delete data.thornMap;
      },
    },
    {
      id: 'T6 Honey On',
      regex: Regexes.gainsEffect({ effect: 'Honey-Glazed' }),
      regexDe: Regexes.gainsEffect({ effect: 'Honigsüß' }),
      regexFr: Regexes.gainsEffect({ effect: 'Mielleux' }),
      regexJa: Regexes.gainsEffect({ effect: '蜂蜜' }),
      regexCn: Regexes.gainsEffect({ effect: '蜂蜜' }),
      regexKo: Regexes.gainsEffect({ effect: '벌꿀' }),
      condition: function(data, matches) {
        return data.me == matches.target;
      },
      run: function(data) {
        data.honey = true;
      },
    },
    {
      id: 'T6 Honey Off',
      regex: Regexes.losesEffect({ effect: 'Honey-Glazed' }),
      regexDe: Regexes.losesEffect({ effect: 'Honigsüß' }),
      regexFr: Regexes.losesEffect({ effect: 'Mielleux' }),
      regexJa: Regexes.losesEffect({ effect: '蜂蜜' }),
      regexCn: Regexes.losesEffect({ effect: '蜂蜜' }),
      regexKo: Regexes.losesEffect({ effect: '벌꿀' }),
      condition: function(data, matches) {
        return data.me == matches.target;
      },
      run: function(data) {
        delete data.honey;
      },
    },
    {
      id: 'T6 Flower',
      regex: Regexes.headMarker({ id: '000D' }),
      alarmText: function(data) {
        if (data.honey) {
          return {
            en: 'Devour: Get Eaten',
          };
        }
      },
      alertText: function(data, matches) {
        if (data.honey)
          return;

        if (data.me == matches.target) {
          return {
            en: 'Devour: Jump In New Thorns',
          };
        }
      },
      infoText: function(data, matches) {
        if (data.honey || data.me == matches.target)
          return;

        return {
          en: 'Avoid Devour',
        };
      },
    },
    {
      id: 'T6 Phase 2',
      regex: Regexes.hasHP({ name: 'Rafflesia', hp: '70', capture: false }),
      regexDe: Regexes.hasHP({ name: 'Rafflesia', hp: '70', capture: false }),
      regexFr: Regexes.hasHP({ name: 'Rafflesia', hp: '70', capture: false }),
      regexJa: Regexes.hasHP({ name: 'ラフレシア', hp: '70', capture: false }),
      regexCn: Regexes.hasHP({ name: '大王花', hp: '70', capture: false }),
      regexKo: Regexes.hasHP({ name: '라플레시아', hp: '70', capture: false }),
      sound: 'Long',
    },
    {
      id: 'T6 Blighted',
      regex: Regexes.startsUsing({ id: '79D', source: 'Rafflesia', capture: false }),
      regexDe: Regexes.startsUsing({ id: '79D', source: 'Rafflesia', capture: false }),
      regexFr: Regexes.startsUsing({ id: '79D', source: 'Rafflesia', capture: false }),
      regexJa: Regexes.startsUsing({ id: '79D', source: 'ラフレシア', capture: false }),
      regexCn: Regexes.startsUsing({ id: '79D', source: '大王花', capture: false }),
      regexKo: Regexes.startsUsing({ id: '79D', source: '라플레시아', capture: false }),
      alarmText: {
        en: 'STOP',
      },
    },
    {
      id: 'T6 Phase 3',
      regex: Regexes.startsUsing({ id: '79E', source: 'Rafflesia', capture: false }),
      regexDe: Regexes.startsUsing({ id: '79E', source: 'Rafflesia', capture: false }),
      regexFr: Regexes.startsUsing({ id: '79E', source: 'Rafflesia', capture: false }),
      regexJa: Regexes.startsUsing({ id: '79E', source: 'ラフレシア', capture: false }),
      regexCn: Regexes.startsUsing({ id: '79E', source: '大王花', capture: false }),
      regexKo: Regexes.startsUsing({ id: '79E', source: '라플레시아', capture: false }),
      condition: function(data) {
        return !data.seenLeafstorm;
      },
      sound: 'Long',
      run: function(data) {
        data.seenLeafstorm = true;
      },
    },
    {
      id: 'T6 Swarm',
      regex: Regexes.startsUsing({ id: '86C', source: 'Rafflesia', capture: false }),
      regexDe: Regexes.startsUsing({ id: '86C', source: 'Rafflesia', capture: false }),
      regexFr: Regexes.startsUsing({ id: '86C', source: 'Rafflesia', capture: false }),
      regexJa: Regexes.startsUsing({ id: '86C', source: 'ラフレシア', capture: false }),
      regexCn: Regexes.startsUsing({ id: '86C', source: '大王花', capture: false }),
      regexKo: Regexes.startsUsing({ id: '86C', source: '라플레시아', capture: false }),
      infoText: {
        en: 'Stack for Acid',
      },
    },
    {
      id: 'T6 Swarm',
      regex: Regexes.ability({ id: '7A0', source: 'Rafflesia' }),
      regexDe: Regexes.ability({ id: '7A0', source: 'Rafflesia' }),
      regexFr: Regexes.ability({ id: '7A0', source: 'Rafflesia' }),
      regexJa: Regexes.ability({ id: '7A0', source: 'ラフレシア' }),
      regexCn: Regexes.ability({ id: '7A0', source: '大王花' }),
      regexKo: Regexes.ability({ id: '7A0', source: '라플레시아' }),
      condition: function(data, matches) {
        return data.me == matches.target || data.role == 'healer' || data.job == 'BLU';
      },
      alertText: function(data, matches) {
        if (matches.target == data.me) {
          return {
            en: 'Swarm on YOU',
          };
        }
      },
      infoText: function(data, matches) {
        if (matches.target != data.me) {
          return {
            en: 'Swarm on ' + data.ShortName(matches.target),
          };
        }
      },
    },
    {
      id: 'T6 Rotten Stench',
      regex: Regexes.headMarker({ id: '000E' }),
      alertText: function(data, matches) {
        if (data.me == matches.target) {
          return {
            en: 'Share Laser (on YOU)',
          };
        }
        return {
          en: 'Share Laser (on ' + data.ShortName(matches.target) + ')',
        };
      },
    },
  ],
  timelineReplace: [
    {
      'locale': 'de',
      'replaceSync': {
        'Engage!': 'Start!',
        'Rafflesia': 'Rafflesia',
        'Scar\'s Edge is no longer sealed': 'Der Zugang zum Narbenrand öffnet sich wieder',
        'Scar\'s Edge will be sealed off': 'bis sich der Zugang zum Narbenrand schließt',
      },
      'replaceText': {
        'Acid Rain': 'Säureregen',
        'Blighted Bouquet': 'Mehltau-Bouquet',
        'Bloody Caress': 'Vampirranke',
        'Briary Growth': 'Wuchernde Dornen',
        'Devour': 'Verschlingen',
        'Floral Trap': 'Saugfalle',
        'Leafstorm': 'Blättersturm',
        'Rotten Stench': 'Fauler Gestank',
        'Spit': 'Ausspeien',
        'Swarm': 'Fähenfurz',
        'Thorn Whip': 'Dornenpeitsche',
        'Viscid Emission': 'Klebsporen',
      },
    },
    {
      'locale': 'fr',
      'replaceSync': {
        'Engage!': 'À l\'attaque !',
        'Rafflesia': 'Rafflesia',
        'Scar\'s Edge is no longer sealed': 'Ouverture du Huis de la Marque',
        'Scar\'s Edge will be sealed off': 'Fermeture du Huis de la Marque',
      },
      'replaceText': {
        'Acid Rain': 'Pluie acide',
        'Blighted Bouquet': 'Bouquet mildiousé',
        'Bloody Caress': 'Caresse sanglante',
        'Briary Growth': 'Poussée de tige',
        'Devour': 'Dévoration',
        'Floral Trap': 'Piège floral',
        'Leafstorm': 'Tempête de feuilles',
        'Rotten Stench': 'Pestilence nauséabonde',
        'Spit': 'Crachat morbide',
        'Swarm': 'Nuée',
        'Thorn Whip': 'Fouet de ronces',
        'Viscid Emission': 'Émission visqueuse',
      },
    },
    {
      'locale': 'ja',
      'replaceSync': {
        'Engage!': '戦闘開始！',
        'Rafflesia': 'ラフレシア',
        'Scar\'s Edge is no longer sealed': 'Scar\'s Edge is no longer sealed', // FIXME
        'Scar\'s Edge will be sealed off': 'Scar\'s Edge will be sealed off', // FIXME
      },
      'replaceText': {
        'Acid Rain': '酸性雨',
        'Blighted Bouquet': 'ブライテッドブーケ',
        'Bloody Caress': 'ブラッディカレス',
        'Briary Growth': 'ブライアリーグロウス',
        'Devour': '捕食',
        'Floral Trap': 'フローラルトラップ',
        'Leafstorm': 'リーフストーム',
        'Rotten Stench': 'ロトンステンチ',
        'Spit': '吐出す',
        'Swarm': 'スウォーム',
        'Thorn Whip': 'ソーンウィップ',
        'Viscid Emission': 'ヴィシドエミッション',
      },
    },
  ],
}];
