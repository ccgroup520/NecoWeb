/**
 * 张轶隽 - 个人简历作品集
 * 交互逻辑脚本
 */

document.addEventListener('DOMContentLoaded', function() {
    // 当前选中的岗位类型
    let currentRole = 'it';
    
    // 岗位配置
    const roleConfig = {
        data: {
            title: '数据分析与运营',
            desc: '数据科学专业背景，围绕真实库存业务台账独立完成数据清洗、指标设计、分析拆解与 Tableau 可视化呈现，适合数据分析、BI、数据运营与经营分析相关岗位。',
            summary: '快速摘要：擅长把多 sheet 业务台账整理成可分析数据集，并输出可直接支持库存管理判断的专题看板。',
            readingPath: ['个人定位', 'Tableau专题项目', '项目经历', '实习经历', '技能工具'],
            tags: ['Python/Pandas', 'Tableau Public', 'SQL/BI看板', '数据建模'],
            stats: [
                { target: 5, suffix: 'w+', label: '进销存数据条' },
                { target: 25, suffix: '%', label: '物流损耗降低' },
                { target: 90, suffix: '%+', label: '人效提升' },
                { target: 40, suffix: '万', label: '年化挽回损失(元)' }
            ]
        },
        it: {
            title: 'VibeCoding',
            desc: '深度掌握 Cursor、Claude Code、Trae 等前沿 AI 编码工具。熟练使用 Prompt Engineering 进行代码生成、复杂逻辑重构、Bug 调试与性能优化，具备将产品 Idea 快速转化为可交付代码的端到端能力。',
            summary: '快速摘要：AI Native 开发者，擅长用 Vibe Coding 模式将产品需求快速转化为可交付代码。',
            readingPath: ['个人定位', 'AI 工作流', '独立开发项目', 'ARABICA小程序', '实习经历', '技能工具'],
            tags: ['Cursor/Claude', 'SwiftUI/iOS', 'Web全栈', '微信小程序'],
            stats: [
                { target: 5, suffix: '+', label: '独立开发项目' },
                { target: 100, suffix: '%', label: 'AI 辅助编码' },
                { target: 3, suffix: '+', label: '平台覆盖 (iOS/Web/小程序)' }
            ]
        },
        media: {
            title: '新媒体与视觉创意',
            desc: '6年专业拍摄经验，集"文案策划+摄影+剪辑+运营"于一身。擅长小红书与公众号从0到1孵化，利用AI工具优化创作流，打造高视觉冲击力的爆款内容。具备多平台矩阵搭建、团购转化及私域引流实战经验。',
            summary: '快速摘要：从内容策略到视觉执行全链路覆盖，兼顾传播效率与品牌质感。',
            readingPath: ['个人定位', '工作经历', '账号数据', '摄影作品', '校园经历', '技能工具'],
            tags: ['爆款内容策划', '专业摄影摄像', '全平台运营', '商业转化'],
            stats: [
                { target: 100, suffix: 'w+', label: '单条视频播放量' },
                { target: 10, suffix: '%+', label: '销售业绩提升' },
                { target: 4.1, suffix: 'w+', label: '公众号粉丝' },
                { target: 14.4, suffix: 'w+', label: '站酷账号人气' }
            ]
        },
        other: {
            title: '其他能力',
            desc: '跨领域复合型人才：具备教学授课、招生转化、客户沟通、团队管理等非技术类核心能力。能够快速适应新领域，将技术思维迁移至业务场景，实现结果导向的高效执行。',
            summary: '快速摘要：教学、销售、管理 — 技术之外的复合型可迁移能力展示。',
            readingPath: ['个人定位', '跨领域能力展示', '能力矩阵', '校园经历', '技能工具'],
            tags: ['教学与课程设计', '客户转化与谈判', '团队管理与协调', '快速学习适应'],
            stats: [
                { target: 10, suffix: 'w+', label: '单月个人业绩(元)' },
                { target: 75, suffix: '%+', label: '招生转化率' },
                { target: 90, suffix: '%+', label: '家长/客户好评率' },
                { target: 30, suffix: '人', label: '摄制团队管理' }
            ]
        }
    };
    
    // 导航切换
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const role = this.dataset.role;
            if (role && role !== currentRole) {
                switchRole(role);
            }
        });
    });
    
    // 切换岗位
    function switchRole(role) {
        currentRole = role;
        const config = roleConfig[role];
        
        // 更新导航激活状态
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.role === role) {
                link.classList.add('active');
            }
        });
        
        // 更新Hero区域
        updateHero(config);
        
        // 根据岗位显示/隐藏区块
        updateSectionScope(role);

        // 更新按岗位分类的内容模块
        updateJourney(role);
        updateHighlights(role);
        updateRepWorks(role);

        // 更新技能
        updateSkills(role);
        
        // 更新项目
        updateProjects(role);
        
        // 切换岗位后回到介绍页开始位置
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            const navbar = document.querySelector('.navbar');
            const offset = navbar ? navbar.offsetHeight : 0;
            const targetTop = Math.max(0, heroSection.offsetTop - offset);
            window.scrollTo({ top: targetTop, behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
    
    // 更新Hero区域
    function updateHero(config) {
        const heroRole = document.getElementById('heroRole');
        const heroDesc = document.querySelector('.hero-desc');
        const heroSummary = document.getElementById('heroSummary');
        const roleReadingPath = document.getElementById('roleReadingPath');
        const profileTags = document.querySelector('.profile-tags');
        const statsContainer = document.querySelector('.hero-stats');
        
        // 更新角色标题
        heroRole.textContent = config.title;
        
        // 更新描述
        heroDesc.textContent = config.desc;

        // 更新岗位摘要
        if (heroSummary) {
            heroSummary.textContent = config.summary || '';
        }

        // 更新阅读顺序提示
        if (roleReadingPath && Array.isArray(config.readingPath)) {
            roleReadingPath.innerHTML = config.readingPath
                .map((item, index) => `<span class="path-step">${index + 1}. ${item}</span>`)
                .join('<span class="path-sep">→</span>');
        }
        
        // 更新标签
        profileTags.innerHTML = config.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        
        // 更新统计数据
        statsContainer.innerHTML = config.stats.map(stat => `
            <div class="stat-item">
                <span class="stat-number" data-target="${stat.target}">0</span>
                <span class="stat-suffix">${stat.suffix}</span>
                <span class="stat-label">${stat.label}</span>
            </div>
        `).join('');
        
        // 重新启动数字动画
        animateNumbers();
    }
    
    // 根据岗位显示区块范围
    function updateSectionScope(role) {
        const scopedSections = document.querySelectorAll('section[data-role-scope]');
        scopedSections.forEach(section => {
            const scope = section.dataset.roleScope;
            if (scope === 'all' || scope === role) {
                section.classList.remove('hidden');
            } else {
                section.classList.add('hidden');
            }
        });
    }

    function toggleByRole(selector, role) {
        const items = document.querySelectorAll(selector);
        items.forEach(item => {
            if (item.dataset.role === role) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    }

    function updateJourney(role) {
        toggleByRole('.journey-step[data-role]', role);
    }

    function updateHighlights(role) {
        toggleByRole('.highlight-card[data-role]', role);
    }

    function updateRepWorks(role) {
        toggleByRole('.rep-item[data-role]', role);
    }
    
    // 更新技能显示
    function updateSkills(role) {
        const skillCategories = document.querySelectorAll('.skill-category');
        skillCategories.forEach(category => {
            if (category.dataset.role === role) {
                category.classList.add('active');
            } else {
                category.classList.remove('active');
            }
        });
    }
    
    // 更新项目显示
    function updateProjects(role) {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            if (card.dataset.role === role) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }
    
    // 数字动画
    function animateNumbers() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.dataset.target);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                // 格式化数字
                if (target >= 1000) {
                    stat.textContent = Math.floor(current).toLocaleString();
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 16);
        });
    }
    
    // 移动端导航切换
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // 点击导航链接后关闭移动端菜单
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
    
    // 图片预览 - 增强版
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTriggers = document.querySelectorAll('[data-lightbox]');
    const lightboxCloseTargets = document.querySelectorAll('[data-lightbox-close]');

    let currentLightboxIndex = 0;
    let lightboxImages = [];

    function openLightbox(src, alt, index) {
        if (!lightboxModal || !lightboxImage) return;
        lightboxImage.src = src;
        lightboxImage.alt = alt || '作品预览';
        currentLightboxIndex = index;
        lightboxModal.classList.add('is-open');
        lightboxModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('lightbox-open');
        updateLightboxCounter();
    }

    function closeLightbox() {
        if (!lightboxModal || !lightboxImage) return;
        lightboxModal.classList.remove('is-open');
        lightboxModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('lightbox-open');
        lightboxImage.src = '';
        lightboxImage.alt = '';
    }

    function updateLightboxCounter() {
        const counter = document.getElementById('lightboxCounter');
        if (counter) {
            counter.textContent = `${currentLightboxIndex + 1} / ${lightboxImages.length}`;
        }
    }

    function navigateLightbox(direction) {
        if (lightboxImages.length === 0) return;
        currentLightboxIndex = (currentLightboxIndex + direction + lightboxImages.length) % lightboxImages.length;
        const item = lightboxImages[currentLightboxIndex];
        lightboxImage.src = item.src;
        lightboxImage.alt = item.alt;
        updateLightboxCounter();
    }

    // 收集所有 lightbox 图片
    lightboxTriggers.forEach((trigger, index) => {
        lightboxImages.push({
            src: trigger.dataset.lightbox,
            alt: trigger.dataset.lightboxAlt || '作品预览'
        });

        trigger.addEventListener('click', function() {
            openLightbox(this.dataset.lightbox, this.dataset.lightboxAlt, index);
        });
    });

    // 点击缩略图也打开 lightbox（用于 profile tableau preview）
    document.querySelectorAll('.tableau-preview-grid img').forEach((img, index) => {
        const src = img.src;
        const alt = img.alt;
        lightboxImages.push({ src, alt });

        img.addEventListener('click', function() {
            const globalIndex = lightboxTriggers.length + index;
            openLightbox(src, alt, globalIndex);
        });
    });

    lightboxCloseTargets.forEach(target => {
        target.addEventListener('click', closeLightbox);
    });

    document.addEventListener('keydown', function(e) {
        if (lightboxModal && lightboxModal.classList.contains('is-open')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                navigateLightbox(-1);
            } else if (e.key === 'ArrowRight') {
                navigateLightbox(1);
            }
        }
    });

    // 点击导航按钮
    document.querySelectorAll('[data-lightbox-prev]').forEach(btn => {
        btn.addEventListener('click', () => navigateLightbox(-1));
    });

    document.querySelectorAll('[data-lightbox-next]').forEach(btn => {
        btn.addEventListener('click', () => navigateLightbox(1));
    });

    // 滚动动画
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // 观察所有需要动画的元素
    document.querySelectorAll('.highlight-card, .skill-item, .project-card, .campus-card, .rep-item, .dashboard-card, .case-result-item, .data-item').forEach(el => {
        observer.observe(el);
    });
    
    // 初始化
    updateSectionScope(currentRole);
    updateJourney(currentRole);
    updateHighlights(currentRole);
    updateRepWorks(currentRole);
    updateSkills(currentRole);
    updateProjects(currentRole);
    animateNumbers();
    
    // 技能进度条动画
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => skillsObserver.observe(bar));
    
    // 侧边导航功能
    const sideNav = document.getElementById('sideNav');
    const sideNavItems = document.querySelectorAll('.side-nav-item');
    const sections = {
        hero: document.querySelector('.hero'),
        repWorks: document.getElementById('repWorks'),
        skills: document.getElementById('skills'),
        projects: document.getElementById('projects'),
        miniapp: document.getElementById('miniapp'),
        photography: document.getElementById('photography'),
        campus: document.getElementById('campus'),
        contact: document.getElementById('contact')
    };
    
    // 显示侧边导航（滚动一定距离后显示）
    function updateSideNavVisibility() {
        const scrollY = window.scrollY;
        const heroHeight = sections.hero ? sections.hero.offsetHeight : 0;
        
        if (scrollY > heroHeight * 0.3) {
            sideNav.classList.add('visible');
        } else {
            sideNav.classList.remove('visible');
        }
    }
    
    // 更新侧边导航激活状态
    function updateSideNavActive() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        
        let currentSection = 'hero';
        
        // 遍历所有section，找到当前可见的section
        Object.keys(sections).forEach(key => {
            const section = sections[key];
            if (section) {
                const sectionTop = section.offsetTop - navbarHeight - windowHeight / 3;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollY >= sectionTop && scrollY < sectionBottom) {
                    currentSection = key;
                }
            }
        });
        
        // 更新激活状态
        sideNavItems.forEach(item => {
            if (item.dataset.section === currentSection) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    // 平滑滚动到指定section
    sideNavItems.forEach(item => {
        const link = item.querySelector('.side-nav-link');
        if (link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const sectionId = this.getAttribute('href').substring(1);
                const targetSection = sections[sectionId];
                
                if (targetSection) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetTop = targetSection.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetTop,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });
    
    // 监听滚动事件
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateSideNavVisibility();
                updateSideNavActive();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // 初始化侧边导航状态
    updateSideNavVisibility();
    updateSideNavActive();

    // ========================================
    // Tableau 看板轮播组件
    // ========================================
    const carousel = document.getElementById('dashboardCarousel');
    if (carousel) {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const dots = carousel.querySelectorAll('.carousel-dot');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        let currentIndex = 0;
        let autoPlayTimer = null;
        const autoPlayInterval = 3800;
        let isPaused = false;

        function updateCarouselHeight() {
            const activeSlide = slides[currentIndex];
            const img = activeSlide.querySelector('img');
            const container = carousel.querySelector('.carousel-container');
            if (img && container) {
                const imgHeight = img.naturalHeight;
                const imgWidth = img.naturalWidth;
                if (imgHeight > 0 && imgWidth > 0) {
                    const containerWidth = container.offsetWidth;
                    const scaledHeight = (imgHeight / imgWidth) * containerWidth;
                    container.style.height = scaledHeight + 'px';
                }
            }
        }

        function goToSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            currentIndex = index;
            if (currentIndex >= slides.length) currentIndex = 0;
            if (currentIndex < 0) currentIndex = slides.length - 1;
            
            slides[currentIndex].classList.add('active');
            dots[currentIndex].classList.add('active');
            
            setTimeout(updateCarouselHeight, 50);
        }

        function nextSlide() {
            goToSlide(currentIndex + 1);
        }

        function prevSlide() {
            goToSlide(currentIndex - 1);
        }

        function startAutoPlay() {
            if (autoPlayTimer) clearInterval(autoPlayTimer);
            autoPlayTimer = setInterval(() => {
                if (!isPaused) {
                    nextSlide();
                }
            }, autoPlayInterval);
        }

        function stopAutoPlay() {
            if (autoPlayTimer) {
                clearInterval(autoPlayTimer);
                autoPlayTimer = null;
            }
        }

        // 导航按钮事件
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                startAutoPlay();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                startAutoPlay();
            });
        }

        // 圆点导航事件
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
                startAutoPlay();
            });
        });

        // 鼠标悬停暂停
        carousel.addEventListener('mouseenter', () => {
            isPaused = true;
        });

        carousel.addEventListener('mouseleave', () => {
            isPaused = false;
        });

        // 触摸支持
        let touchStartX = 0;
        let touchEndX = 0;

        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            isPaused = true;
        }, { passive: true });

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            isPaused = false;
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
                startAutoPlay();
            }
        }

        // 键盘导航
        document.addEventListener('keydown', (e) => {
            const carouselRect = carousel.getBoundingClientRect();
            const isInView = carouselRect.top < window.innerHeight && carouselRect.bottom > 0;
            
            if (isInView) {
                if (e.key === 'ArrowLeft') {
                    prevSlide();
                    startAutoPlay();
                } else if (e.key === 'ArrowRight') {
                    nextSlide();
                    startAutoPlay();
                }
            }
        });

        // 页面可见性变化时暂停/恢复
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopAutoPlay();
            } else {
                startAutoPlay();
            }
        });

        // 窗口大小改变时更新高度
        window.addEventListener('resize', updateCarouselHeight);

        // 图片加载完成后更新高度
        slides.forEach(slide => {
            const img = slide.querySelector('img');
            if (img) {
                if (img.complete) {
                    updateCarouselHeight();
                } else {
                    img.addEventListener('load', updateCarouselHeight);
                }
            }
        });

        // 初始化轮播
        startAutoPlay();
        updateCarouselHeight();
    }

    // 复制到剪贴板功能
    const copyElements = document.querySelectorAll('[data-copy]');
    copyElements.forEach(element => {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            const textToCopy = this.getAttribute('data-copy');
            
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    showToast('已复制到剪贴板');
                }).catch(err => {
                    console.error('复制失败:', err);
                    fallbackCopy(textToCopy);
                });
            } else {
                fallbackCopy(textToCopy);
            }
        });
    });

    function fallbackCopy(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            showToast('已复制到剪贴板');
        } catch (err) {
            console.error('复制失败:', err);
            showToast('复制失败，请手动复制');
        }
        document.body.removeChild(textarea);
    }

    function showToast(message) {
        const existingToast = document.querySelector('.copy-toast');
        if (existingToast) {
            existingToast.remove();
        }

        const toast = document.createElement('div');
        toast.className = 'copy-toast';
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 2000);
    }
});
