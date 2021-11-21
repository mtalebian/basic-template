import * as bd from "react-basic-design";
import React, { useRef, useEffect, useState } from "react";
import { useAccount } from "../../app/account-context";
import { accountApi } from "../../api/account-api";
import { notify } from "../../components/basic/notify";
import { T } from "../../components/basic/text";
import { msgbox } from "react-basic-design";
import { useShell } from "../shared/use-shell";

export const ActiveSessions = () => {
  const [userSessions, setUserSessions] = useState(null);
  const [currentSession, setCurrentSession] = useState(null);
  const [busy, setBusy] = useState(false);
  const account = useAccount();
  const shell = useShell();

  shell.setApp(<T>active-sessions</T>);
  useEffect(() => {
    if (currentSession == null && account.isConnected()) {
      accountApi
        .getActiveSessions()
        .then((result) => {
          var sessions = result.filter((x) => x.currentSession != true);
          var current = result.filter((x) => x.currentSession == true);
          setCurrentSession(current);
          if (sessions.length != 0) {
            setUserSessions(sessions);
          }
        })
        .catch((ex) => {
          notify.error(ex);
        });
    }
  });
  const terminateSessionsClickHandler = () => {
    msgbox(<T>will-all-previous-sessions-end?</T>, null, (hide) => (
      <>
        <bd.Button variant="text" color="primary" onClick={hide} className="m-e-2">
          <T>cancel</T>
        </bd.Button>

        <bd.Button variant="text" color="primary" disabled={busy} onClick={() => onTerminateSessionsClick(hide)} type="button">
          {busy && <div className="m-e-2 spinner-border spinner-border-sm"></div>}
          <T>terminate-all</T>
        </bd.Button>
      </>
    ));
  };
  const onTerminateSessionsClick = (hide) => {
    if (account.isConnected()) {
      setBusy(true);
      accountApi
        .terminateOtherUserSession(userSessions)
        .then((x) => {
          hide();
          notify.info(<T>last-user-sessions-is-terminated</T>);
          setUserSessions(null);
          setBusy(false);
        })
        .catch((ex) => {
          notify.error(ex);
          setBusy(false);
        });
    }
  };
  const profileStyle = {
    maxWidth: 400,
    border: "1px groove #ddd2d263",
    boxShadow: "rgb(0 0 0 / 24%) 0px 3px 8px",
    borderRadius: 9,
    margin: "22px auto",
  };
  return (
    <div className="p-4" style={profileStyle}>
      {currentSession && (
        <>
          <h5 className="text-primary border-bottom">
            <T>Current Session</T>
          </h5>
          {currentSession.map((item, index) => {
            return (
              <div className="row" key={index}>
                <div className="col-10">
                  <dl className="p-2" style={{ borderLeft: "3px groove #25bb25" }}>
                    <dd>
                      <b>{item.applicationAndOSTitle}</b>
                    </dd>
                    <dd>
                      <span>{item.deviceAndOSTitle}</span>
                    </dd>
                    <dd>
                      <span>{item.iP}</span>
                    </dd>
                  </dl>
                </div>
                <div className="col-2 m-auto text-success">
                  <span>Online</span>
                </div>
              </div>
            );
          })}
        </>
      )}
      {userSessions && (
        <>
          <div className="row">
            <bd.Button color="inherit" onClick={terminateSessionsClickHandler}>
              <T className="text-danger">terminate-all-other-sessions</T>
            </bd.Button>
          </div>

          <h5 className="text-primary border-bottom pt-4">
            <T>Active Session</T>
          </h5>
          {userSessions.map((item, index) => {
            return (
              <div className="row" key={index}>
                <div className="col-9">
                  <dl className="pt-2">
                    <dd>
                      <b>{item.applicationAndOSTitle}</b>
                    </dd>
                    <dd>
                      <span>{item.deviceAndOSTitle}</span>
                    </dd>
                    <dd>
                      <span>{item.iP}</span>
                    </dd>
                  </dl>
                </div>
                <div className="col-3 m-auto text-success">
                  <span>{item.sessionDate}</span>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

ActiveSessions.Appbar = {
  title: "active-session",
  buttons: null,
};
