# ScheduleExpress Landing Page

Uma landing page moderna, responsiva e otimizada para conversão, desenvolvida em HTML puro, CSS e JavaScript.

## 🚀 Características

### Design e UX
- **Design Moderno**: Interface limpa e profissional com gradientes e animações suaves
- **Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Alta Conversão**: CTAs estratégicos e formulário otimizado para WhatsApp
- **Performance**: Carregamento rápido com lazy loading e otimizações

### SEO Otimizado
- Meta tags completas para SEO
- Open Graph para redes sociais
- Schema.org structured data
- Sitemap.xml e robots.txt
- PWA ready com manifest.json

### Funcionalidades
- **Formulário WhatsApp**: Envio direto para WhatsApp com validação
- **Animações**: Contadores animados e efeitos de scroll
- **Navegação Suave**: Scroll automático entre seções
- **Notificações**: Sistema de feedback visual
- **Mobile Menu**: Menu hambúrguer responsivo

## 📁 Estrutura de Arquivos

```
scheduleexpress-landing/
├── index.html              # Página principal
├── styles.css              # Estilos CSS
├── script.js               # JavaScript
├── robots.txt              # SEO - Robots
├── sitemap.xml             # SEO - Sitemap
├── manifest.json           # PWA - Manifest
├── README.md               # Documentação
└── images/                 # Pasta de imagens (criar)
    ├── favicon.ico
    ├── hero-illustration.svg
    ├── testimonial-1.jpg
    ├── testimonial-2.jpg
    ├── testimonial-3.jpg
    ├── icon-192x192.png
    └── icon-512x512.png
```

## 🛠️ Configuração

### 1. Número do WhatsApp
Edite o arquivo `script.js` na linha 47:
```javascript
const phoneNumber = '5511999999999'; // Substitua pelo número real
```

### 2. Imagens
Crie a pasta `images/` e adicione:
- `favicon.ico` - Ícone do site
- `hero-illustration.svg` - Ilustração da seção hero
- `testimonial-1.jpg`, `testimonial-2.jpg`, `testimonial-3.jpg` - Fotos dos depoimentos
- `icon-192x192.png` e `icon-512x512.png` - Ícones para PWA

### 3. Informações da Empresa
Edite no arquivo `index.html`:
- Título e meta tags
- Informações de contato
- Links das redes sociais
- Dados estruturados no `script.js`

## 🎨 Personalização

### Cores
As cores principais estão definidas como variáveis CSS em `styles.css`:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #f59e0b;
    --accent-color: #10b981;
    /* ... */
}
```

### Conteúdo
- **Hero Section**: Título, subtítulo e estatísticas
- **Produtos**: Descrições dos softwares Clinical e Beauty
- **Benefícios**: Vantagens da customização
- **Depoimentos**: Testimonials dos clientes
- **Contato**: Informações e formulário

## 📱 Responsividade

A landing page é totalmente responsiva com breakpoints:
- **Desktop**: > 768px
- **Tablet**: 768px - 480px  
- **Mobile**: < 480px

## ⚡ Performance

### Otimizações Implementadas
- Lazy loading para imagens
- CSS e JS minificados
- Debounce em eventos de scroll
- Intersection Observer para animações
- Carregamento assíncrono de recursos

### Métricas Esperadas
- **Lighthouse Score**: 90+ em todas as categorias
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🔧 Funcionalidades JavaScript

### Principais Funções
- `scrollToSection(target)` - Scroll suave para seções
- `showNotification(message, type)` - Sistema de notificações
- `sendToWhatsApp(formData)` - Envio para WhatsApp
- `validateForm(formData)` - Validação do formulário
- `applyPhoneMask(input)` - Máscara para telefone

### Eventos
- Formulário de contato
- Navegação mobile
- Animações de scroll
- Lazy loading de imagens

## 📊 Analytics (Opcional)

Para adicionar Google Analytics, insira o código no `<head>` do `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🚀 Deploy

### Opções de Hosting
1. **Netlify**: Arraste a pasta para o dashboard
2. **Vercel**: Conecte o repositório Git
3. **GitHub Pages**: Ative nas configurações do repositório
4. **Servidor Web**: Upload via FTP/SFTP

### Configurações de Servidor
```apache
# .htaccess para Apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.html [L]

# Headers de cache
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>
```

## 📈 Conversão

### Elementos de Conversão
- **CTAs Estratégicos**: Botões de "Solicitar Demo" em pontos-chave
- **Social Proof**: Estatísticas e depoimentos
- **Urgência**: Formulário direto para WhatsApp
- **Benefícios Claros**: Foco na customização
- **Confiança**: Informações de contato e suporte

### Otimizações Sugeridas
- A/B testing de CTAs
- Heatmap analysis
- User journey tracking
- Formulário multi-step
- Chatbot integrado

## 🔒 Segurança

- Validação client-side e server-side
- Sanitização de inputs
- HTTPS obrigatório
- Headers de segurança
- CSP (Content Security Policy)

## 📞 Suporte

Para dúvidas ou personalizações:
- **Email**: contato@scheduleexpress.com
- **WhatsApp**: +55 (11) 99999-9999
- **Documentação**: [Link para docs]

---

**Desenvolvido com ❤️ para ScheduleExpress** 