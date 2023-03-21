export class UsersTable {
  public static users: any = [
    {
      id: 1,
      username: 'admin',
      password: 'demo',
      email: 'thapelomokole@gmail.com',
      authToken: 'auth-token-8f3ae836da744329a6f93bf20594b5cc',
      refreshToken: 'auth-token-f8c137a2c98743f48b643e71161d90aa',
      roles: [1], // Administrator
      pic: './assets/media/avatars/blank.png',
      fullname: 'Thapelo M',
      firstname: 'Thapelo',
      lastname: 'Mokole',
      occupation: 'CEO',
      companyName: 'Keenthemes',
      phone: '456669067890',
      language: 'en',
      timeZone: 'International Date Line West',
      website: 'https://keenthemes.com',
      emailSettings: {
        emailNotification: true,
        sendCopyToPersonalEmail: false,
        activityRelatesEmail: {
          youHaveNewNotifications: false,
          youAreSentADirectMessage: false,
          someoneAddsYouAsAsAConnection: true,
          uponNewOrder: false,
          newMembershipApproval: false,
          memberRegistration: true,
        },
        updatesFromKeenthemes: {
          newsAboutKeenthemesProductsAndFeatureUpdates: false,
          tipsOnGettingMoreOutOfKeen: false,
          thingsYouMissedSindeYouLastLoggedIntoKeen: true,
          newsAboutMetronicOnPartnerProductsAndOtherServices: true,
          tipsOnMetronicBusinessProducts: true,
        },
      },
      communication: {
        email: true,
        sms: true,
        phone: false,
      },
      address: {
        addressLine: 'L-12-20 Vertex, Cybersquare',
        city: 'San Francisco',
        state: 'California',
        postCode: '45000',
      },
      socialNetworks: {
        linkedIn: 'https://linkedin.com/admin',
        facebook: 'https://facebook.com/admin',
        twitter: 'https://twitter.com/admin',
        instagram: 'https://instagram.com/admin',
      },
    },
  ];

  public static tokens: any = [
    {
      id: 1,
      authToken: 'auth-token-' + Math.random(),
      refreshToken: 'auth-token-' + Math.random(),
    },
  ];
}
