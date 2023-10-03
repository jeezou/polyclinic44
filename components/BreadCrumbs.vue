<template>
  <ol>
    <li>
      <NLink to="/">
        <span>Главная</span>
      </NLink>
    </li>
    <li v-for="(crumb, index) in crumbs" :key="index">
      <NLink :to="crumb.path">
        <span>{{
          $route.fullPath === crumb.path && title !== null ? title : crumb.title
        }}</span>
      </NLink>
    </li>
  </ol>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: null,
    },
  },
  computed: {
    crumbs() {
      const fullPath = this.$route.fullPath
      const params = fullPath.startsWith('/')
        ? fullPath.substring(1).split('/')
        : fullPath.split('/')
      const crumbs = []
      let path = ''
      params.forEach((param, index) => {
        path = `${path}/${param}`
        let match = this.$router.match(path)
        if (match.meta.redirect) {
          const copy = { ...match }
          copy.path = match.meta.redirect
          match = copy
        }
        if (match.name !== null) {
          crumbs.push({
            title: match.meta.crumb,
            ...match,
          })
        }
      })
      return crumbs
    },
  },
}
</script>

<style lang="scss" scoped>
ol {
  display: flex;
  gap: 4px 16px;
  white-space: nowrap;
  flex-wrap: wrap;

  li a {
    text-decoration: none;
    color: $gray-2;
    font-weight: 500;
    font-size: 12px;
    line-height: 28px;
    transition: all $transition;
  }

  li:not(:first-child) {
    display: flex;
    align-items: center;
    column-gap: 16px;
    &:before {
      content: '';
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: $gray-2;
      transition: all $transition;
    }
  }

  li:last-child,
  li:hover {
    a {
      color: $gray-1;
    }

    &:before {
      background: $gray-1;
    }
  }
}
</style>
