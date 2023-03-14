<template>
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <!-- Brand Logo -->
        <a href="/" class="brand-link" style="text-decoration: none;">
            <span class="brand-text font-weight-reguler">Vue Library</span>    
        </a>
        
        <!-- Sidebar -->
        <div class="sidebar">             

        <!-- Sidebar Menu -->
        <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <li class="nav-item">
                    <router-link to="/" class="nav-link">
                        <i class="nav-icon fas fa-home"></i>
                        <p>Dashboard</p>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/Student" class="nav-link">
                        <i class="nav-icon fas fa-users"></i>
                        <p>Student</p>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/Book" class="nav-link">
                        <i class="nav-icon fas fa-book-reader"></i>
                        <p>Book</p>
                    </router-link>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link">
                    <i class="nav-icon fas fa-exchange-alt"></i>
                    <p>
                        Transaction
                        <i class="right fas fa-angle-left"></i>
                    </p>
                    </a>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <router-link to="/Transaction/Borrow" class="nav-link">
                                <i class="nav-icon fas fa-book"></i>
                                <p>Borrow a Book</p>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/Transaction" class="nav-link">
                                <i class=" nav-icon fas fa-history"></i>
                                <p>History</p>
                            </router-link>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
        <!-- /.sidebar-menu -->
        </div>
        <!-- /.sidebar -->
    </aside>
</template>

<script>
export default {
    
}
</script>