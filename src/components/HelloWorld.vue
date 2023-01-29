<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import init, { greet } from '#/hello-wasm/pkg';
// const init,  rust } = import('#/hello-wasm/pkg');

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted () {
	init();
	setTimeout(() => {
		greet('Word!');
		/* console.log(rust);
		rust
			.then(m => m.greet('World!'))
			.catch(console.error); */
	}, 500);
  }
}
</script>
