import React, { Component } from 'react';

type props = {
  meeting: any;
  handleClose: Function;
};
class JitsiComponent extends Component {
  domain = 'j.lkpt.de';
  api = {};

  constructor(props: props) {
    super(props);
    console.log(props.meeting);
    this.state = {
      room: props.meeting.id,
      user: {
        name: 'Client',
      },
      isAudioMuted: false,
      isVideoMuted: false,
    };
  }

  startMeet = () => {
    const options = {
      roomName: this.state.room,
      width: '100%',
      height: 944,
      configOverwrite: {
        prejoinPageEnabled: true,
        enableWelcomePage: true,
        toolbarButtons: [
          'camera',
          'chat',
          'fullscreen',
          'desktop',
          'hangup',
          'microphone',
          'select-background',
        ],
        hideConferenceSubject: true,
        hideConferenceTimer: true,
      },
      interfaceConfigOverwrite: {
        APP_NAME: 'Affectcx',
        CONNECTION_INDICATOR_DISABLED: true,
        DEFAULT_LOGO_URL: 'images/logo.png',
        DEFAULT_WELCOME_PAGE_LOGO_URL: 'images/logo.png',
        DISPLAY_WELCOME_FOOTER: false,
        DISPLAY_WELCOME_PAGE_CONTENT: false,
        DISPLAY_WELCOME_PAGE_TOOLBAR_ADDITIONAL_CONTENT: false,
        HIDE_INVITE_MORE_HEADER: true,
        JITSI_WATERMARK_LINK: 'https://app.affectcx.com',
        MOBILE_APP_PROMO: false,
        NATIVE_APP_NAME: 'Affectcx',
        PROVIDER_NAME: 'Affectcx',
        RECENT_LIST_ENABLED: false,
        SETTINGS_SECTIONS: ['devices', 'profile', 'sounds'],
        SHOW_JITSI_WATERMARK: false,
        VIDEO_QUALITY_LABEL_DISABLED: true,
      },
      parentNode: document.querySelector('#jitsi-iframe'),
      userInfo: {
        displayName: this.state.user.name,
      },
    };
    this.api = new window.JitsiMeetExternalAPI(this.domain, options);

    this.api.addEventListeners({
      readyToClose: this.props.handleClose,
      participantLeft: this.handleParticipantLeft,
      participantJoined: this.handleParticipantJoined,
      videoConferenceJoined: this.handleVideoConferenceJoined,
      videoConferenceLeft: this.handleVideoConferenceLeft,
      audioMuteStatusChanged: this.handleMuteStatus,
      videoMuteStatusChanged: this.handleVideoStatus,
    });
  };

  handleClose = () => {
    console.log('handleClose');
  };

  handleParticipantLeft = async (participant) => {
    console.log('handleParticipantLeft', participant); // { id: "2baa184e" }
    const data = await this.getParticipants();
  };

  handleParticipantJoined = async (participant) => {
    console.log('handleParticipantJoined', participant); // { id: "2baa184e", displayName: "Shanu Verma", formattedDisplayName: "Shanu Verma" }
    const data = await this.getParticipants();
  };

  handleVideoConferenceJoined = async (participant) => {
    console.log('handleVideoConferenceJoined', participant); // { roomName: "bwb-bfqi-vmh", id: "8c35a951", displayName: "Akash Verma", formattedDisplayName: "Akash Verma (me)"}
    const data = await this.getParticipants();
  };

  handleVideoConferenceLeft = () => {
    console.log('handleVideoConferenceLeft');
    // return this.props.history.push('/thank-you');
  };

  handleMuteStatus = (audio) => {
    console.log('handleMuteStatus', audio); // { muted: true }
  };

  handleVideoStatus = (video) => {
    console.log('handleVideoStatus', video); // { muted: true }
  };

  getParticipants() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.api.getParticipantsInfo()); // get all participants
      }, 500);
    });
  }

  // custom events
  executeCommand(command) {
    this.api.executeCommand(command);
    if (command == 'hangup') {
      return this.props.history.push('/thank-you');
    }

    if (command == 'toggleAudio') {
      this.setState({ isAudioMuted: !this.state.isAudioMuted });
    }

    if (command == 'toggleVideo') {
      this.setState({ isVideoMuted: !this.state.isVideoMuted });
    }
  }

  componentDidMount() {
    if (window.JitsiMeetExternalAPI) {
      this.startMeet();
    } else {
      alert('JitsiMeetExternalAPI not loaded');
    }
  }

  render() {
    const { isAudioMuted, isVideoMuted } = this.state;
    return (
      <>
        <div id="jitsi-iframe" style={{ height: '100vh' }}></div>
      </>
    );
  }
}

export default JitsiComponent;
