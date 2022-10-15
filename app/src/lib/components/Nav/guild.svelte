<script>
    function unread() {
        const item = document.getElementById("unread");
        if (item.classList.contains("unread")) {
            return item.classList.remove("unread");
        }
        document.getElementById("unread").classList.add("unread");
    }
    function unactive() {
        const item = document.getElementById("active");
        if (item.classList.contains("active")) {
            return item.classList.remove("active");
        }
        document.getElementById("active").classList.add("active");
    }
</script>



<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<link rel="stylesheet" href="/css/index.css" />
		
</head>

    
		<div class="guild-container">
			<div class="guild home">
				<span class="pill"></span>
				<a href="/home">
				<img src=/icon/homeicon.svg alt="lodsadsadgo">
				</a>
			</div>
			<div class="guild home">
				<span class="pill"></span>
				<a href="/music/home">
				<img src=/icon/musicicon.svg alt="lodsadsadgo">
				</a>
			</div>
			<div class="guild home">
				<span class="pill"></span>
				<a href="/tiktok">
				<img src=/icon/musicicon.svg alt="lodsadsadgo">
				</a>
			</div>
      <div class="guild home">
				<span class="pill"></span>
				<a href="/note">
				<img src=/icon/musicicon.svg alt="lodsadsadgo">
				</a>
			</div>
      <div class="guild home">
				<span class="pill"></span>
				<a href="/video">
				<img src=/icon/musicicon.svg alt="lodsadsadgo">
				</a>
			</div>
			<div class="guild separator">
				<hr />
			</div>
			<div class="guild active" id="active">
				<span class="pill"></span>
				<img class="img" src="./assets/avatar_xnacly.jpg" alt="dsad"/>
			</div>
			<div class="guild unread" id="unread">
				<span class="pill"></span>
				<img class="img" src="./assets/avatar_flam3rboy.png" alt="dsad" />
			</div>
			<div class="guild">
				<span class="pill"></span>
				<img class="img" src="./assets/avatar_xnacly.jpg" alt="dsad"/>
			</div>
			<div class="guild">
				<span class="pill"></span>
				<span class="img">E</span>
			</div>
			<div class="guild">
				<span class="pill"></span>
				<img class="img" src="./assets/avatar_xnacly.jpg" alt="dsad"/>
			</div>
			<div class="guild unread">
				<span class="pill"></span>
				<img class="img" src="./assets/avatar_flam3rboy.png" alt="dsad"/>
			</div>
		</div>
		
    <style>
        body {
            background-color: rgb(54, 57, 63);
            font-family: Arial, Helvetica, sans-serif;
            color: #bbbbbb;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }

        h3 {
            background-color: rgb(33, 33, 33);
            border-radius: 15px;
            padding: 10px 10px;
            font-size: 10px;
            color: rgb(148, 148, 148);
            margin-top: 1.5rem;
        }
        button {
            width: 11rem;
            text-align: center;
        }

		:root {
  --guild-container-background: var(--background-tertiary);
  --guild-container-secondary: var(--background-primary);
  --guild-pill: var(--text-default);
}

.guild-container {
  display: flex;
  flex-direction: column;
  background-color: var(--guild-container-background);
  padding-top: 0.5rem;
  width: 72px;
  max-width: 72px;
  height: 100%;
  position: fixed;
}

.guild {
  display: flex;
  margin-right: 0.6rem;
  align-items: center;
  margin-bottom: 0.5rem;
  cursor: pointer;
}
.guild.unread .pill {
  background-color: var(--guild-pill);
  height: 0.6rem;
  width: 0.25rem;
}
.guild.active {
  border-radius: 25%;
}
.guild .img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  transition: border-radius 0.1s ease, background-color 0.15s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--background-primary);
  text-align: center;
  overflow: hidden;
  user-select: none;
  color: var(--text-default);
}
.guild .img:hover {
  background: var(--primary);
  color: var(--text-strong);
}
.guild.active img {
  border-radius: 35%;
}
.guild.active .pill {
  height: 2.5rem !important;
  width: 0.25rem;
  background-color: var(--guild-pill);
}
.guild.home a {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: var(--guild-container-secondary);
}
.guild.separator {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.guild.separator hr {
  margin: 0;
  padding: 0;
  margin-bottom: 0.5rem;
  width: 40%;
  border: none;
  border-bottom: 2px solid var(--guild-container-secondary);
}
.guild:hover .pill {
  height: 1.25rem;
  width: 0.25rem;
  background-color: var(--guild-pill);
}
.guild:hover .img {
  border-radius: 35%;
}
.guild .pill {
  height: 0rem;
  width: 0.25rem;
  background-color: transparent;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  margin-right: 0.3rem;
  transition: height 0.2s;
}
    </style>