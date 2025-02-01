function AboutPopup() {
  return (
    <div className="m-2">
      <h3 className="font-bold text-2xl mb-4">About</h3>
      <p>
        Globe Chat is a real-time web app built by Brandon Vo. Users may sign in
        with their Google accounts or log in anonymously to be able to chat with
        other users in a single chat room.
      </p>
      <br />
      <p>
        Want to be verified on Globe Chat?
        <br />
        Contact @brandonvo for a badge on Discord.
      </p>
      <br />
      Built with React, TypeScript, Firebase, Zustand, Tailwind CSS.
      <br />
      <a
        className="text-blue-500 hover:text-blue-400 underline"
        href="https://github.com/brandon-vo/globe-chat"
        target="_blank"
        rel="noreferrer"
      >
        Source code
      </a>
    </div>
  );
}

export default AboutPopup;
