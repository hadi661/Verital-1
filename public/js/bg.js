
  function getHeaderClass(divisionName) {
    console.log('Division Name:', divisionName); // Add this line
  switch (divisionName) {
      case 'Aero':
        return 'header-bg4';
      case 'Marine':
        return 'header-bg5';
      case 'CONTRÔLE DE QUALITÉ':
        return 'header-bg6';
      case'INDUSTRIE':
      return 'header-bg7';
      case'TRANSPORT FERROVIAIRE ET GUIDE':
      return 'header-bg8';
      case'CONTROLE ET VERIFICATION DES CONTENEURS':
      return 'header-bg9';
      case'INSPECTION TECHNIQUE DES ASCENSEURS':
      return 'header-bg10';
      // Add more cases for other divisions
      default:
        return ''; // Default class if no match found
    }
  }