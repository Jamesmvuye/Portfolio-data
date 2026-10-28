# Comparaison de deux groupes (DONNÉES SYNTHÉTIQUES)
# Entrée : ../data/essai_synthetique.csv (id, group, sex, age, baseline_score, followup_score)
# Usage  : Rscript analyse_essai.R   (R de base uniquement, aucun package requis)

args <- commandArgs(trailingOnly = FALSE)
script_dir <- dirname(sub("^--file=", "", args[grep("^--file=", args)]))
if (length(script_dir) == 0 || script_dir == ".") script_dir <- getwd()

d <- read.csv(file.path(script_dir, "..", "data", "essai_synthetique.csv"), stringsAsFactors = FALSE)
d$group <- factor(d$group, levels = c("control", "intervention"))

# 1. Données manquantes : décrites, jamais imputées silencieusement
cat("Perdus de vue (followup manquant) :", sum(is.na(d$followup_score)), "sur", nrow(d), "\n")
d$change <- d$followup_score - d$baseline_score
cc <- d[!is.na(d$change), ]  # analyse sur cas complets

# 2. Description par groupe
print(aggregate(change ~ group, data = cc, FUN = function(x) c(n = length(x), mean = mean(x), sd = sd(x))))

# 3. Vérification des hypothèses puis test adapté
sh <- tapply(cc$change, cc$group, function(x) shapiro.test(x)$p.value)
cat("Shapiro-Wilk par groupe (p) :", round(sh, 3), "\n")
t <- t.test(change ~ group, data = cc)  # Welch par défaut
w <- wilcox.test(change ~ group, data = cc, exact = FALSE)
print(t)
cat("Wilcoxon (sensibilité) : p =", signif(w$p.value, 3), "\n")

# 4. Taille d'effet (d de Cohen, écart-type poolé)
g <- split(cc$change, cc$group)
sp <- sqrt(((length(g[[1]]) - 1) * var(g[[1]]) + (length(g[[2]]) - 1) * var(g[[2]])) / (length(cc$change) - 2))
cat("d de Cohen :", round((mean(g[[2]]) - mean(g[[1]])) / sp, 2), "\n")

# 5. Modèle ajusté sur le score initial et l'âge
print(summary(lm(followup_score ~ group + baseline_score + age + sex, data = d)))
