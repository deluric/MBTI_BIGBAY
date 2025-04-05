/* main.js - 主要JavaScript功能 */

// 菜单切换功能
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            const navList = mainNav.querySelector('ul');
            navList.classList.toggle('show');
        });
    }
    
    // 点击页面其他区域关闭菜单
    document.addEventListener('click', function(event) {
        if (mainNav && !mainNav.contains(event.target) && !menuToggle.contains(event.target)) {
            const navList = mainNav.querySelector('ul');
            if (navList.classList.contains('show')) {
                navList.classList.remove('show');
            }
        }
    });
    
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // 如果在移动设备上，关闭菜单
                const navList = mainNav.querySelector('ul');
                if (navList.classList.contains('show')) {
                    navList.classList.remove('show');
                }
            }
        });
    });
    
    // 滚动时添加阴影到导航栏
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});

// 文档页面侧边栏固定
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.doc-sidebar-sticky');
    
    if (sidebar) {
        const sidebarTop = sidebar.offsetTop;
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > sidebarTop - 100) {
                sidebar.classList.add('fixed');
            } else {
                sidebar.classList.remove('fixed');
            }
        });
        
        // 侧边栏导航项目点击
        const navItems = document.querySelectorAll('.doc-nav a');
        
        navItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                
                // 移除所有活动状态
                navItems.forEach(navItem => {
                    navItem.classList.remove('active');
                });
                
                // 添加活动状态到当前项目
                this.classList.add('active');
                
                // 滚动到目标部分
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // 滚动时更新活动导航项目
        const sections = document.querySelectorAll('.doc-section');
        
        window.addEventListener('scroll', function() {
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                
                if (window.scrollY >= sectionTop - 150) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${currentSection}`) {
                    item.classList.add('active');
                }
            });
        });
    }
});
