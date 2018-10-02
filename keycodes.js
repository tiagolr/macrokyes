module.exports = {
  '0x0001': 'ESCAPE',

  // Begin Function Keys
  '59': 'f1',
  '60': 'f2',
  '61': 'f3',
  '62': 'f4',
  '63': 'f5',
  '64': 'f6',
  '65': 'f7',
  '66': 'f8',
  '67': 'f9',
  '68': 'f10',
  '87': 'f11',
  '88': 'f12',

  '91': 'f13',
  '92': 'f14',
  '93': 'f15',
  '99': 'f16',
  '100': 'f17',
  '101': 'f18',
  '102': 'f19',
  '103': 'f20',
  '104': 'f21',
  '105': 'f22',
  '106': 'f23',
  '107': 'f24',
  // End Function Keys

  // Begin Alphanumeric Zone
  '41': 'backquote',

  '2': '1',
  '3': '2',
  '4': '3',
  '5': '4',
  '6': '5',
  '7': '6',
  '8': '7',
  '9': '8',
  '10': '9',
  '11': '0',

  '12': 'minus', // '-'
  '13': 'equals', // '='
  '14': 'backspace',

  '15': 'tab',
  '58': 'caps_lock',

  '30': 'a',
  '48': 'b',
  '46': 'c',
  '32': 'd',
  '18': 'e',
  '33': 'f',
  '34': 'g',
  '35': 'h',
  '23': 'i',
  '36': 'j',
  '37': 'k',
  '38': 'l',
  '50': 'm',
  '49': 'n',
  '24': 'o',
  '25': 'p',
  '16': 'q',
  '19': 'r',
  '31': 's',
  '20': 't',
  '22': 'u',
  '47': 'v',
  '17': 'w',
  '45': 'x',
  '21': 'y',
  '44': 'z',

  '26': 'open_bracket', // '['
  '27': 'close_bracket', // ']'
  '43': 'back_slash', // '\'

  '39': 'semicolon', // ';'
  '40': 'quote',
  '28': 'enter',

  '51': 'comma', // ','
  '52': 'period', // '.'
  '53': 'slash', // '/'

  '57': 'space',
  // End Alphanumeric Zone

  '3639': 'printscreen',
  '70': 'scroll_lock',
  '3653': 'pause',

  // Begin Edit Key Zone
  '3666': 'insert',
  '3667': 'delete',
  '3655': 'home',
  '3663': 'end',
  '3657': 'pageup',
  '3665': 'pagedown',
  // End Edit Key Zone

  // Begin Cursor Key Zone
  '57416': 'up',
  '57419': 'left',
  '57420': 'clear',
  '57421': 'right',
  '57424': 'down',
  // End Cursor Key Zone

  // Begin Numeric Zone
  // '69': 'NUM_LOCK',
  // '3637': 'KP_DIVIDE',
  // '55': 'KP_MULTIPLY',
  // '74': 'KP_SUBTRACT',
  // '3597': 'KP_EQUALS',
  // '78': 'KP_ADD',
  // '3612': 'KP_ENTER',
  // '83': 'KP_SEPARATOR',

  '79': 'numpad_1',
  '80': 'numpad_2',
  '81': 'numpad_3',
  '75': 'numpad_4',
  '76': 'numpad_5',
  '77': 'numpad_6',
  '71': 'numpad_7',
  '72': 'numpad_8',
  '73': 'numpad_9',
  '82': 'numpad_0'

  // '0xEE00': 'KP_END', | VC_KP_1
  // '0xEE00': 'KP_DOWN', | VC_KP_2
  // '0xEE00': 'KP_PAGE_DOWN', | VC_KP_3
  // '0xEE00': 'KP_LEFT', | VC_KP_4
  // '0xEE00': 'KP_CLEAR', | VC_KP_5
  // '0xEE00': 'KP_RIGHT', | VC_KP_6
  // '0xEE00': 'KP_HOME', | VC_KP_7
  // '0xEE00': 'KP_UP', | VC_KP_8
  // '0xEE00': 'KP_PAGE_UP', | VC_KP_9
  // '0xEE00': 'KP_INSERT', | VC_KP_0
  // '0xEE00': 'KP_DELETE', | VC_KP_SEPARATOR
  // End Numeric Zone

  // Begin Media Control Keys
  // '0xE05E': 'POWER',
  // '0xE05F': 'SLEEP',
  // '0xE063': 'WAKE',

  // '0xE022': 'MEDIA_PLAY',
  // '0xE024': 'MEDIA_STOP',
  // '0xE010': 'MEDIA_PREVIOUS',
  // '0xE019': 'MEDIA_NEXT',
  // '0xE06D': 'MEDIA_SELECT',
  // '0xE02C': 'MEDIA_EJECT',

  // '0xE020': 'VOLUME_MUTE',
  // '0xE030': 'VOLUME_UP',
  // '0xE02E': 'VOLUME_DOWN',

  // '0xE06C': 'APP_MAIL',
  // '0xE021': 'APP_CALCULATOR',
  // '0xE03C': 'APP_MUSIC',
  // '0xE064': 'APP_PICTURES',

  // '0xE065': 'BROWSER_SEARCH',
  // '0xE032': 'BROWSER_HOME',
  // '0xE06A': 'BROWSER_BACK',
  // '0xE069': 'BROWSER_FORWARD',
  // '0xE068': 'BROWSER_STOP',
  // '0xE067': 'BROWSER_REFRESH',
  // '0xE066': 'BROWSER_FAVORITES',
  // End Media Control Keys

  // Begin Japanese Language Keys
  // '0x0070': 'KATAKANA',
  // '0x0073': 'UNDERSCORE',
  // '0x0077': 'FURIGANA',
  // '0x0079': 'KANJI',
  // '0x007B': 'HIRAGANA',
  // '0x007D': 'YEN',
  // '0x007E': 'KP_COMMA',
  // End Japanese Language Keys

  // Begin Sun keyboards
//   '0xFF75': 'SUN_HELP',

//   '0xFF78': 'SUN_STOP',
//   '0xFF76': 'SUN_PROPS',
//   '0xFF77': 'SUN_FRONT',
//   '0xFF74': 'SUN_OPEN',
//   '0xFF7E': 'SUN_FIND',
//   '0xFF79': 'SUN_AGAIN',
//   '0xFF7A': 'SUN_UNDO',
//   '0xFF7C': 'SUN_COPY',
//   '0xFF7D': 'SUN_INSERT',
//   '0xFF7B': 'SUN_CUT',
  // End Sun keyboards

  // '0': 'UNDEFINED', // KeyCode Unknown

  // CHAR_UNDEFINED	  0xFFFF	// CharCode Unknown
  /* End Virtual Key Codes */
}
