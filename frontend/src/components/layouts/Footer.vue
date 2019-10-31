<template>
    <footer class="footer">
        <div class="container">
            <nav>
                <ul>
                    <li>
                        <a href="#">Grupo Webmax</a>
                    </li>
                    <li>
                        <a href="#">About Us</a>
                    </li>
                    <li>
                        <a href="#">Blog</a>
                    </li>
                    <li>
                        <a href="#">Licenses</a>
                    </li>
                </ul>
            </nav>
            <div class="copyright text-center"> 
            &copy; {{ new Date().getFullYear() }} 
            <a href="#" target="_blank">Grupowebmax</a>, made with 
                <i class="fa fa-heart heart"></i> for a better web
            </div>
        </div>
    </footer>
</template>

<script>

export default {
    name: 'Footer'
}
</script>
<style>
</style>
