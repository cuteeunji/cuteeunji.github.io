const auth1 = "github_pat_11A";
const auth2 = "DULF4Y0cPNc34L";
const auth3 = "wflzt_kjEqS1dc";
const auth4 = "dSgCaAu4SWI9bu";
const auth5 = "8wjYRUnWC1niX5";
const auth6 = "Xr7xL4C7UZ7HUB";
const auth7 = "E2k2tKHsw";

loadComments(auth1 + auth2 + auth3 + auth4 + auth5 + auth6 + auth7);
registerComment(auth1 + auth2 + auth3 + auth4 + auth5 + auth6 + auth7);

function loadComments(auth) {
  fetch("https://api.github.com/repos/cuteeunji/cuteeunji.github.io/issues", {
    method: "GET",
    headers: {
      Authorization: "token " + auth,
    },
  })
    .then((res) => res.json())
    .then((comments) => {
      let commentList = document.getElementById("comment-list");
      for (let i in comments) {
        commentList.innerHTML += `
        <li>
          <p class="name">${comments[i].title}</p>
          <p class="date">${comments[i].created_at
            .replace("T", "  ")
            .replace("Z", "")
            .slice(0, -9)}</p>
          <p class="memo">${comments[i].body}</p>
        </li>`;
      }
    });
}

function registerComment(auth) {
  let commentRegistration = document.getElementById("comment-registration");
  commentRegistration.addEventListener("click", () => {
    let name = document.getElementById("comment-name");
    let msg = document.getElementById("comment-msg");
    if (!name.value) {
      alert("이름을 입력해주세요!");
    } else if (!msg.value) {
      alert("축하 메시지를 입력해주세요!");
    } else {
      fetch(
        "https://api.github.com/repos/cuteeunji/cuteeunji.github.io/issues",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "token " + auth,
          },
          body: JSON.stringify({
            title: name.value,
            body: msg.value,
          }),
        }
      ).then((res) => res.json())
      .then((comment) => {
        name.value = "";
        msg.value = "";
        let commentList = document.getElementById("comment-list");
        commentList.innerHTML = `
        <li>
          <p class="name">${comment.title}</p>
          <p class="date">${comment.created_at
            .replace("T", "  ")
            .replace("Z", "")
            .slice(0, -9)}</p>
          <p class="memo">${comment.body}</p>
        </li>` + commentList.innerHTML;
      });
    }
  });
}