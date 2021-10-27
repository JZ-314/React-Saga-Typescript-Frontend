import _ from 'lodash';
export const onRemoteTrack = (state, track) => {
  if (track.isLocal()) {
    return null;
  }
  const participantId = track.getParticipantId();
  if (!state.remoteTracks[participantId]) {
    state.remoteTracks[participantId] = [track];
  } else {
    for (let i = 0; i < state.remoteTracks[participantId].length; i++) {
      const _track = state.remoteTracks[participantId][i];
      if (_track.getType() === track.getType()) {
        _.remove(state.remoteTracks[participantId], state.remoteTracks[participantId][i]);
        break;
      }
    }
    state.remoteTracks[participantId].push(track);
  }
  const participantTrack = {};
  participantTrack[participantId] = state.remoteTracks[participantId];
  return participantTrack;
};

export const onTrackRemoved = (state, track) => {
  if (track.isLocal()) {
    return null;
  }
  const participantId = track.getParticipantId();
  if (state.remoteTracks[participantId]) {
    for (let i = 0; i < state.remoteTracks[participantId].length; i++) {
      const _track = state.remoteTracks[participantId][i];
      if (_track.getType() === track.getType()) {
        _.remove(state.remoteTracks[participantId], state.remoteTracks[participantId][i]);
        break;
      }
    }
  }
  const participantTrack = {};
  participantTrack[participantId] = state.remoteTracks[participantId];
  return participantTrack;
};
