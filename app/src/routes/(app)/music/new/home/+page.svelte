<script>
  import { onMount } from 'svelte';

  import Love from '../love.svelte';
  import Discover from '../discover.svelte';
  import Mine from '../mine.svelte';

  import AllcollectSongers from '../allcollectSongers.svelte';
  import Lovelistdetail from '../lovelistdetail.svelte';
  import Moresonger from '../moresonger.svelte';
  import Moresong from '../moresong.svelte';
  import Morelist from '../morelist.svelte';


  import { dailySignin } from '$lib/api/user';

  import { isLoginStore, homeActiveStore } from '$lib/stores/song/common';

  onMount(() => {
    $isLoginStore ? homeActiveStore.set(0) : homeActiveStore.set(1);
    //签到
    let date = new Date();
    if (
      $isLoginStore &&
      localStorage.getItem('dailySigninFun_date') != '' + date.getFullYear() + (date.getMonth() + 1) + date.getDate()
    ) {
      dailySigninFun();
    }
  });
  //签到
  async function dailySigninFun() {
    await dailySignin();
    let date = new Date();
    localStorage.setItem('dailySigninFun_date', '' + date.getFullYear() + (date.getMonth() + 1) + date.getDate());
  }
</script>


<div style="display:{$homeActiveStore === 0 ? 'block' : 'none'}">
  <Love />
</div>
<div style="display:{$homeActiveStore === 1 ? 'block' : 'none'}">
  <Discover />
</div>
<div style="display:{$homeActiveStore === 2 ? 'block' : 'none'}">
  <Mine />
</div>

<div style="display:{$homeActiveStore === 2 ? 'block' : 'none'}">
  <AllcollectSongers />
</div>
<div style="display:{$homeActiveStore === 2 ? 'block' : 'none'}">
  <Lovelistdetail />
</div>
<div style="display:{$homeActiveStore === 2 ? 'block' : 'none'}">
  <Moresonger />
</div>
<div style="display:{$homeActiveStore === 2 ? 'block' : 'none'}">
  <Moresong />
</div>
<div style="display:{$homeActiveStore === 2 ? 'block' : 'none'}">
  <Morelist />
</div>

